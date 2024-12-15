import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AssignedProjects from './components/AssignedProjects';
import ProjectTracker from './components/ProjectTracker';

function App() {
  const userId = "675ebc3fa1ba2d44d8bce608"; // Replace with dynamic user authentication or hardcode a demo ID.

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route to view all assigned projects */}
          <Route 
            path="/" 
            element={<AssignedProjects userId={userId} />} 
          />

          {/* Route to track project progress */}
          <Route 
            path="/projects/track/:projectId" 
            element={
              <ProjectTrackerWrapper />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

/**
 * Wrapper to fetch project data dynamically from URL (e.g., projectId).
 * Replace this with a centralized state or API call to get actual data if necessary.
 */
function ProjectTrackerWrapper() {
  const projectId = window.location.pathname.split('/').pop(); // Get projectId from URL
  const currentStatus = "Pending"; // Placeholder; fetch this dynamically via API.

  return <ProjectTracker projectId={projectId} currentStatus={currentStatus} />;
}

export default App;

