import React, { useState, useEffect, useRef } from "react";
import * as XLSL from "xlsx";
import {
  SideNav,
  Header,
  StaffGrade,
  SalaryLevel,
  Step,
  BasePay,
  ErrorBox,
  PayStructureTable,
} from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
} from "../../styles/library";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoadingSpinner, Successful } from "../../modals";
import { hrGetBasePayFunc } from "../../actions/basepay";
import { hrGetAllStaffGradesFunc } from "../../actions/staffgrade";
import { hrGetSalaryLevelsFunc } from "../../actions/salarylevel";
import { hrGetSalaryStepsFunc } from "../../actions/salarysteps";
// import {
//   HR_GET_BASEPAY_RESET,
// } from "../../types/basepay";
import { logoutAdmin } from "../../actions/auth";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { COLORS } from "../../values/colors";
import {
  hrCreateJuniorStaffGradeFunc,
  hrCreateManagementStaffGradeFunc,
  hrCreateMiddleStaffGradeFunc,
  hrCreateSeniorStaffGradeFunc,
} from "../../actions/salarystructure";
import { paystructureFormatter } from "../../hooks/functions";
import {
  HR_CREATE_JUNIOR_STAFF_GRADE_RESET,
  HR_CREATE_MANAGEMENT_STAFF_GRADE_RESET,
  HR_CREATE_MIDDLE_STAFF_GRADE_RESET,
  HR_CREATE_SENIOR_STAFF_GRADE_RESET,
} from "../../types/salarystructrue";
import { downloadPayStructureTemplateExcelFileFunc } from "../../actions/download";
import { DOWNLOADING_ON_PROCESS_ERROR } from "../../types/download";

const PayStructure = ({
  toggle,
  toggleMenu,
  mobileToggle,
  toggleMobileMenu,
}) => {
  // hsitory init
  const history = useHistory();
  // dispatch init
  const dispatch = useDispatch();
  // redux state
  const {
    isLoading: getBasePayLoading,
    basePays,
    error: getBasePayError,
  } = useSelector((state) => state.hrGetBasePay);
  const {
    isLoading: getStaffGradeLoading,
    salaryGrades,
    error: getStaffGradeError,
  } = useSelector((state) => state.hrGetStaffGrade);
  const {
    isLoading: getSalaryLevelLoading,
    salaryLevels,
    error: getSalaryLevelError,
  } = useSelector((state) => state.hrGetSalaryLevel);

  const {
    isLoading: getStepsLoading,
    salarySteps,
    error: getStepsError,
  } = useSelector((state) => state.hrGetSteps);

  const {
    isLoading: juniorStaffLoading,
    success: juniorStaffGrade,
    error: juniorStaffError,
  } = useSelector((state) => state.hrCreateJuniorStaffGrade);

  const {
    isLoading: middleStaffLoading,
    success: middleStaffGrade,
    error: middleStaffError,
  } = useSelector((state) => state.hrCreateMiddleStaffGrade);
  const {
    isLoading: seniorStaffLoading,
    success: seniorStaffGrade,
    error: seniorStaffError,
  } = useSelector((state) => state.hrCreateSeniorStaffGrade);
  const {
    isLoading: managementStaffLoading,
    success: managementStaffGrade,
    error: managementStaffError,
  } = useSelector((state) => state.hrCreateManagementStaffGrade);

  const { isLoading: downloadLoading, error: downloadError } = useSelector(
    (state) => state.downloadStatus
  );

  const { adminInfo } = useSelector((state) => state.adminLoginStatus);

  const hiddenFileInput = useRef(null);
  const hiddenFileInput2 = useRef(null);
  const hiddenFileInput3 = useRef(null);
  const hiddenFileInput4 = useRef(null);

  //func state
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  const [fileName, setFileName] = useState(null);
  const [fileName2, setFileName2] = useState(null);
  const [fileName3, setFileName3] = useState(null);
  const [fileName4, setFileName4] = useState(null);
  const [showError, setShowError] = useState(null);

  const [juniorStaffGradeData, setJuniorStaffGradeData] = useState([]);
  const [middleStaffGradeData, setMiddleStaffGradeData] = useState([]);
  const [seniorStaffGradeData, setSeniorStaffGradeData] = useState([]);
  const [managementStaffGradeData, setManagementStaffGradeData] = useState([]);

  const theme = useTheme();

  const sfl = "active";

  // useEffects
  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    } else {
      if (userRole === "HR") {
        dispatch(hrGetBasePayFunc());
        dispatch(hrGetAllStaffGradesFunc());
        dispatch(hrGetSalaryLevelsFunc());
        dispatch(hrGetSalaryStepsFunc());
      }
    }
    if (
      userRole === "Internal Auditor" ||
      userRole === "CEO" ||
      userRole === "Accountant"
    ) {
      history.push("dashboard");
    } else if (userRole === "Employee") {
      history.push("dashboard");
    }
  }, [dispatch, adminInfo, userRole, history]);

  useEffect(() => {
    if (
      getBasePayError === "no token was passed" ||
      getStaffGradeError === "no token was passed" ||
      getSalaryLevelError === "no token was passed" ||
      getStepsError === "no token was passed"
    ) {
      dispatch(logoutAdmin("no token was passed"));
      // dispatch({ type: HR_GET_BASEPAY_RESET });
    }
  }, [
    dispatch,
    getBasePayError,
    getStaffGradeError,
    getSalaryLevelError,
    getStepsError,
  ]);

  const handleClick = (name) => () => {
    switch (name) {
      case "juniorStaffGrade":
        hiddenFileInput.current?.click();
        break;
      case "middleStaffGrade":
        hiddenFileInput2.current?.click();
        break;
      case "seniorStaffGrade":
        hiddenFileInput3.current?.click();
        break;
      case "managementStaffGrade":
        hiddenFileInput4.current?.click();
        break;
      default:
        break;
    }
  };

  // handle File
  const fileType = ["application/vnd.ms-excel"];
  const fileType2 = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (name) => (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      switch (name) {
        case "juniorStaffGrade":
          setFileName(selectedFile?.name);
          break;
        case "middleStaffGrade":
          setFileName2(selectedFile?.name);
          break;
        case "seniorStaffGrade":
          setFileName3(selectedFile?.name);
          break;
        case "managementStaffGrade":
          setFileName4(selectedFile?.name);
          break;
        default:
          break;
      }

      readExcelFile(selectedFile, name);
    } else {
      setShowError("Please select a file");
    }
  };

  const readExcelFile = (file, name) => {
    if (
      file &&
      (fileType.includes(file?.type) || fileType2.includes(file?.type))
    ) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        switch (name) {
          case "juniorStaffGrade":
            converToJsonData(e.target?.result, "juniorStaffGrade");
            break;
          case "middleStaffGrade":
            converToJsonData(e.target?.result, "middleStaffGrade");
            break;
          case "seniorStaffGrade":
            converToJsonData(e.target?.result, "seniorStaffGrade");
            break;
          case "managementStaffGrade":
            converToJsonData(e.target?.result, "managementStaffGrade");
            break;

          default:
            break;
        }
      };
    } else {
      setShowError("Please select only specified file type");
    }
  };

  const converToJsonData = (data, name) => {
    const workbook = XLSL.read(data, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const convertedData = XLSL.utils.sheet_to_json(worksheet);

    if (convertedData !== null) {
      switch (name) {
        case "juniorStaffGrade":
          setJuniorStaffGradeData({
            juniorStaffGrade: paystructureFormatter(convertedData),
          });
          break;
        case "middleStaffGrade":
          setMiddleStaffGradeData({
            middleStaffGrade: paystructureFormatter(convertedData),
          });
          break;
        case "seniorStaffGrade":
          setSeniorStaffGradeData({
            seniorStaffGrade: paystructureFormatter(convertedData),
          });
          break;
        case "managementStaffGrade":
          setManagementStaffGradeData({
            managementStaffGrade: paystructureFormatter(convertedData),
          });
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (downloadError) {
      dispatch({ type: DOWNLOADING_ON_PROCESS_ERROR });
    }
  }, [dispatch, downloadError]);

  const uploadBulk = (name) => () => {
    switch (name) {
      case "juniorStaffGrade":
        if (fileName) {
          dispatch(hrCreateJuniorStaffGradeFunc(juniorStaffGradeData));
        }
        break;
      case "middleStaffGrade":
        if (fileName2) {
          dispatch(hrCreateMiddleStaffGradeFunc(middleStaffGradeData));
        }
        break;
      case "seniorStaffGrade":
        if (fileName3) {
          dispatch(hrCreateSeniorStaffGradeFunc(seniorStaffGradeData));
        }
        break;
      case "managementStaffGrade":
        if (fileName4) {
          dispatch(hrCreateManagementStaffGradeFunc(managementStaffGradeData));
        }
        break;
      default:
        break;
    }
  };

  const downloadTemplate = (type) => () => {
    switch (type) {
      case "juniorstaffgrade":
        dispatch(downloadPayStructureTemplateExcelFileFunc(type));
        break;
      case "middlestaffgrade":
        dispatch(downloadPayStructureTemplateExcelFileFunc(type));
        break;
      case "seniorstaffgrade":
        dispatch(downloadPayStructureTemplateExcelFileFunc(type));
        break;
      case "managementstaffgrade":
        dispatch(downloadPayStructureTemplateExcelFileFunc(type));
        break;
      default:
        break;
    }
  };

  const popup7 = () => {
    if (juniorStaffGrade) {
      dispatch({ type: HR_CREATE_JUNIOR_STAFF_GRADE_RESET });
    } else if (middleStaffGrade) {
      dispatch({ type: HR_CREATE_MIDDLE_STAFF_GRADE_RESET });
    } else if (seniorStaffGrade) {
      dispatch({ type: HR_CREATE_SENIOR_STAFF_GRADE_RESET });
    } else if (managementStaffGrade) {
      dispatch({ type: HR_CREATE_MANAGEMENT_STAFF_GRADE_RESET });
    }
  };

  useEffect(() => {
    if (
      juniorStaffGrade ||
      middleStaffGrade ||
      seniorStaffGrade ||
      managementStaffGrade
    ) {
      dispatch(hrGetSalaryStepsFunc());
    }
  }, [
    juniorStaffGrade,
    middleStaffGrade,
    seniorStaffGrade,
    managementStaffGrade,
    dispatch,
  ]);

  return (
    <>
      {(getBasePayLoading ||
        getStaffGradeLoading ||
        getSalaryLevelLoading ||
        getStepsLoading) && <LoadingSpinner toggle={toggle} />}

      {(juniorStaffLoading ||
        middleStaffLoading ||
        seniorStaffLoading ||
        managementStaffLoading ||
        (downloadLoading && !downloadError)) && (
        <LoadingSpinner toggle={toggle} />
      )}

      {(juniorStaffGrade ||
        middleStaffGrade ||
        seniorStaffGrade ||
        managementStaffGrade) && (
        <Successful
          isOpen7={
            juniorStaffGrade ||
            middleStaffGrade ||
            seniorStaffGrade ||
            managementStaffGrade
          }
          popup7={popup7}
          message={
            "Uploaded Successfully"
            // juniorStaffGrade ||
            // middleStaffGrade ||
            // seniorStaffGrade ||
            // managementStaffGrade
          }
        />
      )}
      <DashboardContainer>
        <DashboardContent>
          <SideNav
            userRole={userRole}
            sfl={sfl}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Salary Structure"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />

            {/* <input type="button" value="Export Excel" onClick={exportExel} /> */}
            <Container maxWidth="xl">
              {(juniorStaffError ||
                middleStaffError ||
                seniorStaffError ||
                managementStaffError) && (
                <ErrorBox
                  errorMessage={
                    juniorStaffError ||
                    middleStaffError ||
                    seniorStaffError ||
                    managementStaffError
                  }
                />
              )}
              <Box sx={{ width: "100%", display: "flex" }}>
                {!downloadLoading && downloadError && (
                  <ErrorBox errorMessage={downloadError} />
                )}
                <Box
                  sx={{
                    width: { xs: "100%", lg: "70%" },
                    m: "auto",
                    "& .MuiButton-root": {
                      color: theme.palette.secondary.main,
                      bgcolor: theme.palette.secondary[1000],
                      width: { xs: "100%", lg: "100%" },
                      "&:hover": {
                        color: theme.palette.secondary.main,
                        bgcolor: theme.palette.secondary[1000],
                      },
                    },
                    "& .MuiButton-root:last-child": {
                      marginLeft: "1rem",
                    },
                    "& .MuiTypography-h2": {
                      fontWeight: "500",
                    },
                  }}
                >
                  <Box sx={{ width: "100%", p: "3rem 0" }}>
                    <Typography variant="h2">Junior Staff Grade</Typography>
                    <label>
                      Select a file to import: ...*
                      <span
                        style={{ color: `${COLORS.red}`, fontSize: "1.3rem" }}
                      >
                        (must be a .xls, .xlsx or .csv file extension)
                      </span>
                    </label>
                    {showError && <ErrorBox errorMessage={showError} />}
                    <div className="upload_empfile">
                      <p
                        className="choose__btn"
                        onClick={handleClick("juniorStaffGrade")}
                      >
                        Choose a file
                      </p>
                      <p>{fileName}</p>
                    </div>
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      onChange={handleFile("juniorStaffGrade")}
                      accept=".xls,.xlsx,.csv"
                      style={{ display: "none" }}
                    />
                    <Stack direction={"row"}>
                      <Button
                        variant="contained"
                        children="Upload"
                        onClick={uploadBulk("juniorStaffGrade")}
                      />
                      <Button
                        variant="contained"
                        children="Download Template"
                        onClick={downloadTemplate("juniorstaffgrade")}
                      />
                    </Stack>
                  </Box>

                  <Box sx={{ width: "100%", p: "3rem 0" }}>
                    <Typography variant="h2">Middle Staff Grade</Typography>
                    <label>
                      Select a file to import: ...*
                      <span
                        style={{ color: `${COLORS.red}`, fontSize: "1.3rem" }}
                      >
                        (must be a .xls, .xlsx or .csv file extension)
                      </span>
                    </label>
                    {showError && <ErrorBox errorMessage={showError} />}
                    <div className="upload_empfile">
                      <p
                        className="choose__btn"
                        onClick={handleClick("middleStaffGrade")}
                      >
                        Choose a file
                      </p>
                      <p>{fileName2}</p>
                    </div>
                    <input
                      type="file"
                      ref={hiddenFileInput2}
                      onChange={handleFile("middleStaffGrade")}
                      accept=".xls,.xlsx,.csv"
                      style={{ display: "none" }}
                    />
                    <Stack direction={"row"}>
                      <Button
                        variant="contained"
                        children="Upload"
                        onClick={uploadBulk("middleStaffGrade")}
                      />
                      <Button
                        variant="contained"
                        children="Download Template"
                        onClick={downloadTemplate("middlestaffgrade")}
                      />
                    </Stack>
                  </Box>
                  <Box sx={{ width: "100%", p: "3rem 0" }}>
                    <Typography variant="h2">Senior Staff Grade</Typography>
                    <label>
                      Select a file to import: ...*
                      <span
                        style={{ color: `${COLORS.red}`, fontSize: "1.3rem" }}
                      >
                        (must be a .xls, .xlsx or .csv file extension)
                      </span>
                    </label>
                    {showError && <ErrorBox errorMessage={showError} />}
                    <div className="upload_empfile">
                      <p
                        className="choose__btn"
                        onClick={handleClick("seniorStaffGrade")}
                      >
                        Choose a file
                      </p>
                      <p>{fileName3}</p>
                    </div>
                    <input
                      type="file"
                      ref={hiddenFileInput3}
                      onChange={handleFile("seniorStaffGrade")}
                      accept=".xls,.xlsx,.csv"
                      style={{ display: "none" }}
                    />
                    <Stack direction={"row"}>
                      <Button
                        variant="contained"
                        children="Upload"
                        onClick={uploadBulk("seniorStaffGrade")}
                      />
                      <Button
                        variant="contained"
                        children="Download Template"
                        onClick={downloadTemplate("seniorstaffgrade")}
                      />
                    </Stack>
                  </Box>
                  <Box sx={{ width: "100%", p: "3rem 0" }}>
                    <Typography variant="h2">Management Staff Grade</Typography>
                    <label>
                      Select a file to import: ...*
                      <span
                        style={{ color: `${COLORS.red}`, fontSize: "1.3rem" }}
                      >
                        (must be a .xls, .xlsx or .csv file extension)
                      </span>
                    </label>
                    {showError && <ErrorBox errorMessage={showError} />}
                    <div className="upload_empfile">
                      <p
                        className="choose__btn"
                        onClick={handleClick("managementStaffGrade")}
                      >
                        Choose a file
                      </p>
                      <p>{fileName4}</p>
                    </div>
                    <input
                      type="file"
                      ref={hiddenFileInput4}
                      onChange={handleFile("managementStaffGrade")}
                      accept=".xls,.xlsx,.csv"
                      style={{ display: "none" }}
                    />
                    <Stack direction={"row"}>
                      <Button
                        variant="contained"
                        children="Upload"
                        onClick={uploadBulk("managementStaffGrade")}
                      />
                      <Button
                        variant="contained"
                        children="Download Template"
                        onClick={downloadTemplate("managementstaffgrade")}
                      />
                    </Stack>
                  </Box>
                </Box>
              </Box>

              <PayStructureTable salarySteps={salarySteps} toggle={toggle} />
            </Container>
            {/* <BasePay basePays={basePays} toggle={toggle} />
            <StaffGrade staffGrade={salaryGrades} toggle={toggle} />
            <SalaryLevel
              salaryLevels={salaryLevels}
              staffGrade={salaryGrades}
              toggle={toggle}
            />
            <Step
              salarySteps={salarySteps}
              staffGrade={salaryGrades}
              salaryLevels={salaryLevels}
              toggle={toggle}
            /> */}
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default PayStructure;
