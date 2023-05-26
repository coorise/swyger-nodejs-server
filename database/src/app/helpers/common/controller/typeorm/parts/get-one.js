import {sendResult} from "../../../../send_result";

const findOne = async (service,name,req, res, next)=>{
  const option={ //this is for socket emission
    path:name+'/get-one',
    function:'findOne'
  }
  await sendResult(service,option,req,res,next)

}

export default findOne
