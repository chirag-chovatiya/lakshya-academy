import { StudentReport } from "./studentReportSchema";
import { User } from "../users/userSchema";
import { Op } from "sequelize";
export const createReport = async (data) => {
  try {
    const parseMarks = (marks) => {
      const [obtained, total] = (marks || "0/0").split("/").map(val => parseFloat(val) || 0);
      return { obtained, total };
    };

    const subjectMarks = {
      additionMark: parseMarks(data.additionMark),
      subtractionMark: parseMarks(data.subtractionMark),
      multiplicationMark: parseMarks(data.multiplicationMark),
      divisionMark: parseMarks(data.divisionMark)
    };

    const totalMarks = Object.values(subjectMarks).reduce((sum, subject) => sum + subject.total, 0);
    const obtainedMarks = Object.values(subjectMarks).reduce((sum, subject) => sum + subject.obtained, 0);

    let percentage = 0;
    if (totalMarks > 0) {
      percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);
    }

    data.result = `${percentage}%`;

    const existingReport = await StudentReport.findOne({ where: { testId: data.testId } });
    
    if (existingReport) {
      const updatedReport = await existingReport.update(data);
      return updatedReport;
    } else {
      const createData = await StudentReport.create(data);
      return createData;
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
};
export const getAllReport = async (
  page = 1,
  pageSize = 10,
  hwStatus = null,
  level = null,
  createdAt=null,
  studentName = null
) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    const includeClause = [
      {
        model: User,
        as: "student",
        attributes: ["name", "level"],
        where: {
          ...(level && { level }),
          ...(studentName && { name: { [Op.like]: `%${studentName}%` } }),
        },
      },
    ];
    const whereClause = {};

    if (!page && !pageSize) {
      const getStudentReport = await StudentReport.findAll({
        include: includeClause,
      });
      return getStudentReport;
    }

    if (hwStatus === "complete") {
      whereClause.hwStatus = true;
    } else if (hwStatus === "incomplete") {
      whereClause.hwStatus = false;
    }

    if (createdAt) {
      const startOfDay = new Date(createdAt).setHours(0, 0, 0, 0);
      const endOfDay = new Date(createdAt).setHours(23, 59, 59, 999);
      whereClause.createdAt = { [Op.between]: [startOfDay, endOfDay] };
    }

    
    const getReport = await StudentReport.findAndCountAll({
      where: whereClause,
      offset,
      limit: parsedPageSize,
      include: includeClause,
    });

    const totalPages = Math.ceil(getReport.count / parsedPageSize);
    return {
      data: getReport.rows,
      currentPage: parsedPage,
      totalPages: totalPages,
      totalData: getReport.count,
    };
  } catch (error) {
    throw error;
  }
};
export const getReportById = async (reportId) => {
  try {
    const getData = await StudentReport.findOne({ where: { id: reportId } });
    return getData;
  } catch (error) {
    throw error;
  }
};
export const updateReportById = async (reportId, updatedData) => {
  try {
    const report = await StudentReport.findOne({ where: { id: reportId } });
    if (!report) {
      return null;
    }
    const updatedReport = await report.update(updatedData);
    return updatedReport;
  } catch (error) {
    throw error;
  }
};
export const deleteReportById = async function (reportId) {
  try {
    const deleteReport = await StudentReport.findOne({
      where: { id: reportId },
    });
    if (deleteReport) {
      await deleteReport.destroy();
      return;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
