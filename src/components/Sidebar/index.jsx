"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarLinkGroup from "./SidebarLinkGroup";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  let pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      id="sideScroll"
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-custom-blue duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/admin/">
          {/* <div className="flex justify-center items-center space-y-2"> */}
          <img
            src="/assets/logo/finallogo.png"
            alt="Logo"
            className="w-30 h-25 rounded-lg"
          />
          {/* <h1 className="uppercase text-[23px] text-center font-semibold text-white">
              Geniplus Kids Abacus
            </h1> */}
          {/* </div> */}
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <span>Icon</span>
        </button>
      </div>

      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2 px-4 py-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Student --> */}
              <li>
                <Link
                  href={pathname.match(/\/admin/) ? "/admin/" : "/teacher/"}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/admin/" || pathname === "/teacher/") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <span>
                    <i className="fa-solid fa-user"></i>
                  </span>
                  Student List
                </Link>
              </li>
              {/* <!-- Student End --> */}

              {/* <!-- Exam List --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin/addition" ||
                  pathname === "/teacher/addition" ||
                  pathname.includes("addition")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/admin/addition" ||
                            pathname === "/teacher/addition" ||
                            pathname.includes("addition")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <span>
                          <i className="fa-solid fa-user"></i>
                        </span>
                        Manage Exam
                        <span>
                          <i
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fa-solid fa-angle-down ${
                              open && "rotate-180"
                            }`}
                          ></i>
                        </span>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href={
                                pathname.match(/\/admin/)
                                  ? "/admin/addition"
                                  : "/teacher/addition"
                              }
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/addition" ||
                                (pathname === "/teacher/addition" &&
                                  "text-white")
                              }`}
                            >
                              Student Exam
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Student End --> */}

              {/* <!-- Student Report Start --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin/report" ||
                  pathname === "/teacher/report" ||
                  pathname.includes("report")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/admin/report" ||
                            pathname === "/teacher/report" ||
                            pathname.includes("report")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <span>
                          <i className="fa-solid fa-user"></i>
                        </span>
                        Student Report
                        <span>
                          <i
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fa-solid fa-angle-down ${
                              open && "rotate-180"
                            }`}
                          ></i>
                        </span>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href={
                                pathname.match(/\/admin/)
                                  ? "/admin/report"
                                  : "/teacher/report"
                              }
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/report" && "text-white"
                              }`}
                            >
                              <span>
                                <i className="fa-solid fa-user"></i>
                              </span>
                              Student Report
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Student Report End --> */}

              {/* Student Image Start */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin/studentImage" ||
                  pathname === "/teacher/studentImage" ||
                  pathname.includes("studentImage")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/admin/studentImage" ||
                            pathname === "/teacher/studentImage" ||
                            pathname.includes("studentImage")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <span>
                          <i className="fa-solid fa-user"></i>
                        </span>
                        HomeWork Image
                        <span>
                          <i
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fa-solid fa-angle-down ${
                              open && "rotate-180"
                            }`}
                          ></i>
                        </span>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href={
                                pathname.match(/\/admin/)
                                  ? "/admin/studentImage"
                                  : "/teacher/studentImage"
                              }
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/studentImage" ||
                                (pathname === "/teacher/studentImage" &&
                                  "text-white")
                              }`}
                            >
                              Image List
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Student Image End */}
              {/* Attendance Start */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin/attendance" ||
                  pathname === "/teacher/attendance" ||
                  pathname.includes("attendance")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/admin/attendance" ||
                            pathname === "/teacher/attendance" ||
                            pathname.includes("attendance")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <span>
                          <i className="fa-solid fa-user"></i>
                        </span>
                        Attendance
                        <span>
                          <i
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fa-solid fa-angle-down ${
                              open && "rotate-180"
                            }`}
                          ></i>
                        </span>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href={
                                pathname.match(/\/admin/)
                                  ? "/admin/attendance"
                                  : "/teacher/attendance"
                              }
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/attendance" ||
                                (pathname === "/teacher/attendance" &&
                                  "text-white")
                              }`}
                            >
                              Attendance List
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Attendance End */}
              {/* Lesson Start */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin/Lesson" ||
                  pathname === "/teacher/Lesson" ||
                  pathname.includes("lessson")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/admin/lessson" ||
                            pathname === "/teacher/lessson" ||
                            pathname.includes("lessson")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <span>
                          <i className="fa-solid fa-user"></i>
                        </span>
                        Student Lesson
                        <span>
                          <i
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fa-solid fa-angle-down ${
                              open && "rotate-180"
                            }`}
                          ></i>
                        </span>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href={
                                pathname.match(/\/admin/)
                                  ? "/admin/lesson"
                                  : "/teacher/lesson"
                              }
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/lesson" ||
                                (pathname === "/teacher/lesson" && "text-white")
                              }`}
                            >
                              Lesson List
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Lesson End */}
              {/* Notice Start */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin/notice" || pathname.includes("notice")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/admin/notice" ||
                            pathname.includes("notice")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <span>
                          <i className="fa-solid fa-user"></i>
                        </span>
                        Notice
                        <span>
                          <i
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fa-solid fa-angle-down ${
                              open && "rotate-180"
                            }`}
                          ></i>
                        </span>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href={
                                pathname.match(/\/admin/)
                                  ? "/admin/notice"
                                  : "/teacher/notice"
                              }
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/notice" || "text-white"
                              }`}
                            >
                              Notice
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Notice End */}
              {/* Advertisement Start */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin/advertisement" ||
                  pathname.includes("advertisement")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/admin/advertisement" ||
                            pathname.includes("advertisement")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <span>
                          <i className="fa-solid fa-user"></i>
                        </span>
                        Advertisement
                        <span>
                          <i
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fa-solid fa-angle-down ${
                              open && "rotate-180"
                            }`}
                          ></i>
                        </span>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href={
                                pathname.match(/\/admin/)
                                  ? "/admin/advertisement"
                                  : "/teacher/advertisement"
                              }
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/advertisement" ||
                                "text-white"
                              }`}
                            >
                              TeacherAdvertisement
                            </Link>
                          </li>
                          {pathname.startsWith("/admin") && (
                            <li>
                              <Link
                                href="/admin/teacherAdvertisement"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === "/admin/teacherAdvertisement" &&
                                  "text-white"
                                }`}
                              >
                                AdminToTeacherAdv
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Advertisement End */}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
