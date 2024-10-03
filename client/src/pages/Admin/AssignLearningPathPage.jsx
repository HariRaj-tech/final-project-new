// src/pages/Admin/AssignLearningPathPage.js

import React from 'react';
import AssignLearningPath from '../../components/Admin/AssignLearningPath';
import Navbar from '../../components/Common/Navbar';
import Footer from '../../components/Common/Footer';

const AssignLearningPathPage = () => {
  return (
    <div className="admin-page">
      <Navbar />
      <div className="main-content">
        <main>
          <AssignLearningPath />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AssignLearningPathPage;
