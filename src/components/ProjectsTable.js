import React, { useEffect, useState } from 'react';
import '../css/ProjectsTable.css';

const ProjectsTable = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.log("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const totalRecords = projects.length;
    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedProjects = projects.slice(startIndex, startIndex + recordsPerPage);

    return (
        <div className="container">
            <h1>Kickstarter Projects</h1>
            <table className="projects-table" aria-label="Kickstarter Projects Table">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Percentage Funded</th>
                        <th>Amount Pledged</th>
                    </tr>
                </thead>
                {
                    !projects.length ? (<tbody><tr><td>Loading...</td></tr></tbody>)
                        :
                        <tbody>
                            {paginatedProjects.map((project, index) => (
                                <tr key={index}>
                                    <td>{project['s.no']}</td>
                                    <td>{project['percentage.funded']}</td>
                                    <td>{project['amt.pledged']}</td>
                                </tr>
                            ))}
                        </tbody>
                }
            </table>
            <div className="pagination" role="navigation" aria-label="Pagination Controls">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous Page"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalRecords / recordsPerPage)))}
                    disabled={currentPage * recordsPerPage >= totalRecords}
                    aria-label="Next Page"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProjectsTable;
