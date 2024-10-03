// src/pages/Admin/AssignCoursePage.js

import React from 'react';
import AssignCourse from '../../components/Admin/AssignCourse';
import Navbar from '../../components/Common/Navbar';
import Footer from '../../components/Common/Footer';

const AssignCoursePage = () => {
  return (
    <div className="admin-page">
      <Navbar />
      <div className="main-content">

        <main>
          <AssignCourse />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AssignCoursePage;
