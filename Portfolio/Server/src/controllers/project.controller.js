const getProjects = (req, res) => {

    const projects = [
        {
            id: 1,
            title: "SmartJar"
        },
        {
            id: 2,
            title: "CUDAS"
        }
    ];

    res.json(projects);

};

module.exports = {
    getProjects
};