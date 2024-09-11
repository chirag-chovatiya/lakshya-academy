"use client";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormElementStudent from "../components/form-element";



export default function StudentCreate() {
  return (
    <div className="">
      <Breadcrumb pageName="Student/create" title="Register New Student" />
      <FormElementStudent/>
    </div>
  );
}
