"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormElementStudent from "../components/form-element";
import { useRouter } from "next/navigation";
import { post } from "@/service/api";
import { API } from "@/service/constant/api-constant";

export default function StudentCreate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    level: 0,
    type: 0,
    status: true,
    images: null,
  });
  const router = useRouter();

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      const response = await post(API.getAllUser, data || formData);
      if (response.code === 201) {
        router.replace("/admin/student");
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };
  return (
    <div className="">
      <Breadcrumb pageName="Student/create" title="Register New Student" />
      <FormElementStudent  data={formData} handleSubmit={handleSubmit}/>
    </div>
  );
}
