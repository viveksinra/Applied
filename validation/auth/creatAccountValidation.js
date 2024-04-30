
const validateOnCreate = async (req, res, next) => {
  if ( !req.body.mobileNumber && !req.body.primaryEmail  ) {
    return res.json({
      message: "email/mobile is required fields.",
      variant: "error"
    });
  }
  if ( !req.body.password ) {
    return res.json({
      message: "password is required fields.",
      variant: "error"
    });
  }
  if ( !req.body.profileType ) {
    return res.json({
      message: "Profile Type is required fields.",
      variant: "error"
    });
  }

   // check for duplicate
   if(req.body.mobileNumber)
{ let myData1 = await User.findOne({mobileNumber:req.body.mobileNumber}).catch(Err => console.log(Err))

 if (myData1) {
    return res.json({
      message: "Mobile Number already registered",
      variant: "error",
    });  
  }}
  if(req.body.primaryEmail){
 let myData2 = await User.findOne({primaryEmail:req.body.primaryEmail}).catch(Err => console.log(Err))

 if (myData2) {
    return res.json({
      message: "Mobile Number already registered",
      variant: "error",
    });  
  }}
    next();
  };
  
  const validateOnUpdate = async (req, res, next) => {
  
    let myData = await Ledger.find({ledger:req.body.ledger}).catch(Err => console.log(Err))
    let myData2 = await Ledger.findById(req.params.id).catch(Err => console.log(Err))
    let obj = myData[0]
    if (myData.length > 1  ) {
       return res.json({
         message: "Seems to be duplicate data",
         variant: "error",
       });  
     }
    if ((myData.length > 0) && (obj.ledger != myData2.ledger)) {
       return res.json({
         message: "Seems to be duplicate data",
         variant: "error",
       });  
     }
      
    next();
  };
  const validateOnDelete = async (req, res, next) => {
  
    const myLedger = await Ledger.findOne({_id:req.params.id});
    if (myLedger.isDefault) {
      return res.json({
        message: "Default Ledger can't be deleted",
        variant: "error",
      });  
    }
      
    next();
  };
  
  module.exports = { validateOnCreate, validateOnUpdate,validateOnDelete };
  