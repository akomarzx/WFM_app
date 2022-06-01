const {PunchInfo , Attendance} = require('../models')

let create_attendance = async(req, res) =>{
    let { punchId } = req.body;
    try{
        let punchInfo = await PunchInfo.findOne({where : {punch_id : punchId}});
        if(punchInfo){
            let emp_attendance = Attendance.create({
                emp_id : punchInfo.emp_id
            })
            res.json(emp_attendance);
        }
    }
    catch(e){
        res.json(e.message)
    }    
}

module.exports = {
    create_attendance
}