let get_dashboard = function(req, res){
    res.locals.employee = req.user;
    res.render('./dashboardViews/index');
}

module.exports = {
    get_dashboard
}