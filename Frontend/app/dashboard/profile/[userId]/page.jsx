"use client";
import React, { useState,useRef,useEffect } from 'react'
import {Grid, Container, Typography,Card,Avatar,Badge,TextField,Fab, MenuItem,Tooltip, CircularProgress } from '@mui/material/';
import { FaUser,FaPlusCircle  } from "react-icons/fa";
import { useImgUpload } from '../../../hooks/useImgUpload'
import {authService} from "../../../services"
import MySnackbar from "../../../Components/MySnackbar/MySnackbar";
import { useRouter } from "next/navigation";
import CustomAutocomplete from "../../../hooks/AutoComplete"

function PersonalProfile({params}) {
  const {userId} = params;
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg]= useState(false);
  const [userImage, setImgUrl] = useState("");
  const [firstName,setFN] = useState("");
  const [lastName,setLN] = useState("");
  const [headline,setHeadline] = useState("");
  const [primaryEmail, setPEmail] = useState("");
  const [secondaryEmail, setSEmail] = useState("");
  const [domainSkills, setDomains] = useState([]);
  const [employmentType, setEmpType] = useState("");
  const [personalSkills, setPSkill] = useState([]); 
  const [dob, setDOB] = useState("")   
  const [allEmpType] = useState(["Full Time", "Part Time", "Contract", "Student"])
  // const [allDomain] = useState([{label:"Accounting",value:"Accounting"},{label:"Data Analytics",value:"Data Analytics"}, {label:"Graphic Design",value:"Graphic Design"},{label:"Business Analytics",value:"Business Analytics"},{label:"Other",value:"Other"}])
  const [allSkill] = useState([{label:"Public Speaking",value:"Public Speaking"},{label:"Editing",value:"Editing"}, {label:"Blogging",value:"Blogging"},{label:"Other",value:"Other"}])
  const snackRef = useRef();
  const router = useRouter();

  const fillData = (d) =>{
    setImgUrl(d?.userImage ?? "");
    setFN(d?.firstName ?? "");
    setLN(d?.lastName ?? "");
    setHeadline(d?.headline ?? "");
    setPEmail(d?.primaryEmail ?? "");
    setSEmail(d?.secondaryEmail ?? "");
    setDomains(d?.domainSkills ?? []);
    setEmpType(d?.employmentType ?? "");
    setPSkill(d?.personalSkills ?? []);
    setDOB(d?.dob ?? "");
  }
  useEffect(() => {
    const getData = async () =>{
      setLoading(true)
      try {
        let res = await authService.get(`api/v1/auth/profile/getOne/${userId}`);
        setLoading(false)

        if(res.variant === "success"){
          fillData(res.data)
        }  
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    if(userId){
      getData()
    }
  }, [userId])
  
  const handlePerData = async (e) => {
    e.preventDefault();
    let myData = {userImage,firstName,lastName,headline,employmentType,primaryEmail,secondaryEmail,domainSkills,personalSkills,dob}
    setLoading(true);
    try {
      let res = await authService.post(`api/v1/auth/createAccount/add/additionalData`,myData);
      snackRef.current.handleSnack(res);
      setLoading(false)
      if(res.variant ==="success"){
        router.push(`/dashboard/profile/experience/${userId}`)
      }  
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const imgUpload = async (e) => {
    setLoadingImg(true);
    let url = await useImgUpload(e);
    if (url) {
      setImgUrl(url);
      setLoadingImg(false);
    } else {
      snackRef.current.handleSnack({
        message: "Image Not Selected",
        info: "warning",
      });
      setLoadingImg(false);
    }
  };
  return (
    <main>
      <Container className='vCenter'>
      <Typography variant="h6" gutterBottom align="center" >Setup Your Personal Profile</Typography>
      <Card elevation={3} sx={{padding:"20px",display:"flex",justifyContent:"center",flexDirection:"column",minWidth:"440px",borderRadius:"16px"}}>
      <form onSubmit={(e) => handlePerData(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12} className='center'>
            {loadingImg ? <CircularProgress /> :    <label htmlFor="personalImg">
        <input type="file" id="personalImg" style={{display:"none"}} onChange={(e) => imgUpload(e.target.files[0])}  accept="image/*"  />
        <Tooltip title="Upload Your Photo" arrow>
        <Badge badgeContent={<FaPlusCircle style={{fontSize:"16px",marginLeft:"-25px",marginTop:"-20px",color:"#0180ff"}} />} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
           <Avatar alt={firstName} sx={{cursor: "pointer",width: 112, height: 112, border:"4px solid #d9fdd3"}} src={userImage}><FaUser style={{fontSize:"40px"}}/> </Avatar>
           </Badge>
        </Tooltip>
        </label>}
       
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={firstName} disabled={loading} onChange={(e) => setFN(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="First Name" fullWidth label="First Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={lastName} disabled={loading} onChange={(e) => setLN(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Last Name" fullWidth label="Last Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={employmentType} select onChange={(e) => setEmpType(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Employment Type" fullWidth label="Employment Type" variant="outlined" >
              {allEmpType.map((e,i)=><MenuItem key={i} value={e}>{e}</MenuItem>)}
            </TextField>
          
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={headline} disabled={loading} onChange={(e) => setHeadline(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Headline" fullWidth label="Headline" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={primaryEmail} type="email" disabled onChange={(e) => setPEmail(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Primary Email" fullWidth label="Primary Email" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={secondaryEmail} type="email" onChange={(e) => setSEmail(e.target.value)} InputProps={{style:{borderRadius:"35px"}}} placeholder="Secondary Email" fullWidth label="Secondary Email" variant="outlined" />
          </Grid>
         
          <Grid item xs={12} md={6}>
          <CustomAutocomplete
            multiple
            options={allDomain}
            disabled ={allDomain.length === 0 || loading}
            // isOptionEqualToValue={(option) => option.label}
            // isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(e, v) => {
              setDomains(v);
            }}
            value={domainSkills}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Domain Skill"
                placeholder="Domain Skill"
                
              />
            )}
          />
          </Grid>
          <Grid item xs={12} md={6}>
          <CustomAutocomplete
            multiple
            options={allSkill}
            // isOptionEqualToValue={(option) => option.label}
            // isOptionEqualToValue={(option, value) => option.value === value.value}
            disabled ={allSkill.length === 0 || loading}
            onChange={(e, v) => {
              setPSkill(v);
            }}
            value={personalSkills}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                // select
                // InputProps={{style:{borderRadius:"35px"}}}
                label="Personal Skills"
                placeholder="Personal Skills"
                
              />
            )}
          />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField value={dob} type='date' focused onChange={(e) => setDOB(e.target.value)} required InputProps={{style:{borderRadius:"35px"}}} placeholder="Date of Birth" fullWidth label="Date of Birth" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <br />
            </Grid>
          <Grid item xs={12} className='center'>
              <Fab variant="extended"  type='submit' sx={{textTransform:"capitalize",paddingLeft:"24px",paddingRight:"24px"}} size='small' color="primary">
            Next
            </Fab>
          </Grid>
        </Grid>
        </form>
       
    
      </Card>
      </Container>
          
    <MySnackbar ref={snackRef} />
    </main>
  )
}

export default PersonalProfile


const allDomain = [
  { label: "ACCOUNTING", id: "accounting" },
  { label: "ADMINISTRATION", id: "administration" },
  { label: "AIR CONDITION", id: "airCondition" },
  { label: "Allergy and Immunology", id: "allergyImmunology" },
  { label: "Anatomy", id: "anatomy" },
  { label: "Anesthesia", id: "anesthesia" },
  { label: "ARCHEOLOGY", id: "archeology" },
  { label: "ARCHITECTURE", id: "architecture" },
  { label: "ARTIFICAL INTELLIGENCE", id: "artificialIntelligence" },
  { label: "ARTIFICIAL LIFT", id: "artificialLift" },
  { label: "ARTS", id: "arts" },
  { label: "ASTROLOGY", id: "astrology" },
  { label: "AUTOMATION", id: "automation" },
  { label: "AUTOMOBILE", id: "automobile" },
  { label: "Aviation medicine", id: "aviationMedicine" },
  { label: "Ayurveda", id: "ayurveda" },
  { label: "BAKING", id: "baking" },
  { label: "BILLING AND COLLECTION", id: "billingAndCollection" },
  { label: "BIOCHEMIST", id: "biochemist" },
  { label: "Biochemistry", id: "biochemistry" },
  { label: "BIOLOGIST", id: "biologist" },
  { label: "Biomedical engineer", id: "biomedicalEngineer" },
  { label: "BIOMEDICINE", id: "biomedicine" },
  { label: "BIOTECHNOLOGY", id: "biotechnology" },
  { label: "BUILDING MANAGEMENT", id: "buildingManagement" },
  { label: "BUSINESS DEVELOPMENT", id: "businessDevelopment" },
  { label: "BUSINESS MANAGEMENT", id: "businessManagement" },
  { label: "CALL CENTER", id: "callCenter" },
  { label: "CAR SALES", id: "carSales" },
  { label: "CARDIOLOGY", id: "cardiology" },
  { label: "CASHIER", id: "cashier" },
  { label: "CEMENTING", id: "cementing" },
  { label: "CHARTERED ACCOUNTANT", id: "charteredAccountant" },
  { label: "CHEMICAL ENGINEERING", id: "chemicalEngineering" },
  { label: "CHIROPRACTOR", id: "chiropractor" },
  { label: "CINEMA", id: "cinema" },
  { label: "CIVIL ENGINEERING", id: "civilEngineering" },
  { label: "Clinical coder", id: "clinicalCoder" },
  { label: "CLOUD ARCHITECT", id: "cloudArchitect" },
  { label: "CLOUD ENGINEERING", id: "cloudEngineering" },
  { label: "CLOUD KITCHEN", id: "cloudKitchen" },
  { label: "CODING", id: "coding" },
  { label: "COLD STORAGE", id: "coldStorage" },
  { label: "COMEDY", id: "comedy" },
  { label: "COMMUNICATIONS", id: "communications" },
  { label: "Community health", id: "communityHealth" },
  { label: "CONSTRUCTION", id: "construction" },
  { label: "CONTRACTING", id: "contracting" },
  { label: "CUSTOMER SUPPORT", id: "customerSupport" },
  { label: "DATA ANALYST", id: "dataAnalyst" },
  { label: "DATA CENTER MANAGEMENT", id: "dataCenterManagement" },
  { label: "DATA MINING", id: "dataMining" },
  { label: "DATABASE MANAGEMENT", id: "databaseManagement" },
  { label: "DENTIST", id: "dentist" },
  { label: "Dermatology", id: "dermatology" },
  { label: "Diagnostic investigation", id: "diagnosticInvestigation" },
  { label: "DIRECTIONAL DRILLING", id: "directionalDrilling" },
  { label: "DISTRIBUTION", id: "distribution" },
  { label: "DRILLING", id: "drilling" },
  { label: "DRIVING", id: "driving" },
  { label: "ELECTRICAL ENGINEERING", id: "electricalEngineering" },
  { label: "ELECTRICAL NETWORKING", id: "electricalNetworking" },
  { label: "ELECTRNOICS ENGINEERING", id: "electronicsEngineering" },
  { label: "ENGINEERING", id: "engineering" },
  { label: "ENT", id: "ent" },
  { label: "FACILITY MANAGEMENT", id: "facilityManagement" },
  { label: "FASHION DESIGNING", id: "fashionDesigning" },
  { label: "FAST FOOD", id: "fastFood" },
  { label: "FIELD MANAGEMENT", id: "fieldManagement" },
  { label: "FIELD SERVICE", id: "fieldService" },
  { label: "FINANCE", id: "finance" },
  { label: "FISHERIES", id: "fisheries" },
  { label: "FISHING", id: "fishing" },
  { label: "FLEET MANAGEMENT", id: "fleetManagement" },
  { label: "FOOD AND BEVERAGE", id: "foodAndBeverage" },
  { label: "Forensic science", id: "forensicScience" },
  { label: "FREIGHT FORWARDING", id: "freightForwarding" },
  { label: "geriatrics", id: "geriatrics" },
  { label: "Gynaecology", id: "gynaecology" },
  { label: "HEALTH AND HYGIENE", id: "healthAndHygiene" },
  { label: "Health Education", id: "healthEducation" },
  { label: "Homeopathy", id: "homeopathy" },
  { label: "HOSPITALITY", id: "hospitality" },
  { label: "HOSPITALS", id: "hospitals" },
  { label: "HUMAN RESOURCE", id: "humanResource" },
  { label: "HVAC", id: "hvac" },
  { label: "Ichthyology", id: "ichthyology" },
  { label: "INFORMATION TECHNOLOGY", id: "informationTechnology" },
  { label: "INSPECTION AND TESTING", id: "inspectionAndTesting" },
  { label: "INSURANCE", id: "insurance" },
  { label: "JOURNALISM", id: "journalism" },
  { label: "Laboratory Technology", id: "laboratoryTechnology" },
  { label: "LEGAL", id: "legal" },
  { label: "LOGGING", id: "logging" },
  { label: "LOGISTICS", id: "logistics" },
  { label: "MACHINIG", id: "machinig" },
  { label: "MEDIA", id: "media" },
  { label: "Medical Imaging Technology", id: "medicalImagingTechnology" },
  { label: "MEDICAL SCIENCE", id: "medicalScience" },
  { label: "Medicine", id: "medicine" },
  { label: "METALLURGIST", id: "metallurgist" },
  { label: "METERING", id: "metering" },
  { label: "Microbiology", id: "microbiology" },
  { label: "MINING", id: "mining" },
  { label: "MULTIPHASE PUMPS", id: "multiphasePumps" },
  { label: "Naturopathy", id: "naturopathy" },
  { label: "NEUROLOGY", id: "neurology" },
  { label: "Nursing", id: "nursing" },
  { label: "Obstetrics", id: "obstetrics" },
  { label: "Occupational Therapy", id: "occupationalTherapy" },
  { label: "OILFIELD MANAGEMENT", id: "oilfieldManagement" },
  { label: "OILFIELD OPERATOR", id: "oilfieldOperator" },
  { label: "OILFIELD SPECIALIST", id: "oilfieldSpecialist" },
  { label: "OILFIELD SUPERVISOR", id: "oilfieldSupervisor" },
  { label: "Ophthalmology", id: "ophthalmology" },
  { label: "Optometry", id: "optometry" },
  { label: "Orthopedics", id: "orthopedics" },
  { label: "PACKAGING", id: "packaging" },
  { label: "PACKING AND HANDLING", id: "packingAndHandling" },
  { label: "PAINTING", id: "painting" },
  { label: "Pathology", id: "pathology" },
  { label: "Pediatrics", id: "pediatrics" },
  { label: "Pharmacist", id: "pharmacist" },
  { label: "Pharmacology", id: "pharmacology" },
  { label: "Physiotherapy", id: "physiotherapy" },
  { label: "PHYSOTHERAPY", id: "physiotherapy" },
  { label: "POLITICAL SCIENCE", id: "politicalScience" },
  { label: "POWER GRIDS", id: "powerGrids" },
  { label: "PRESSURE CONTROLS", id: "pressureControls" },
  { label: "PRESSURE PUMPING", id: "pressurePumping" },
  { label: "PRODUCT DESIGN", id: "productDesign" },
  { label: "PROGRAMMER", id: "programmer" },
  { label: "Psychiatry", id: "psychiatry" },
  { label: "PUMPING", id: "pumping" },
  { label: "Radiology", id: "radiology" },
  { label: "SALES", id: "sales" },
  { label: "SHIPPING", id: "shipping" },
  { label: "SMART FIELDS", id: "smartFields" },
  { label: "SMART GRIDS", id: "smartGrids" },
  { label: "SOFTWARE DEVELOPMENT", id: "softwareDevelopment" },
  { label: "SPORTS", id: "sports" },
  { label: "STYLING", id: "styling" },
  { label: "SUPERVISION", id: "supervision" },
  { label: "SUPPLY CHAIN", id: "supplyChain" },
  { label: "SURFACE FACILITIES", id: "surfaceFacilities" },
  { label: "TECHNICIAN", id: "technician" },
  { label: "TELECOMMUNICATION", id: "telecommunication" },
  { label: "TELIVISION", id: "television" },
  { label: "THEATER", id: "theater" },
  { label: "Therapist", id: "therapist" },
  { label: "TRADING", id: "trading" },
  { label: "TREASURY", id: "treasury" },
  { label: "UNDERWRITER", id: "underwriter" },
  { label: "venereology", id: "venereology" },
  { label: "Veterinary Sciences", id: "veterinarySciences" },
  { label: "WELDING", id: "welding" },
  { label: "WELL COMPLETIONS", id: "wellCompletions" },
  { label: "WRITER", id: "writer" },
  { label: "ZOOLOGY", id: "zoology" }
];