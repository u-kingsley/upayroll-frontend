import axios from "axios";
import cookie from "js-cookie";
import { saveAs } from "file-saver";
import {
  DOWNLOADING_ON_PROCESS_DONE,
  DOWNLOADING_ON_PROCESS_ERROR,
  DOWNLOADING_ON_PROCESS_REQUEST,
} from "../types/download";

import { urlConfig } from "../util/config/config";

export const downloadSalaryAndVoucherExcelFileFunc =
  (type, modelType, month, dataArr) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-excel-file/salaryslip?type=${type}&modelType=${modelType}&month=${month}`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );

      const exelBlob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(
        exelBlob,
        `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`
      );
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadEmployeeSummaryExcelFileFunc =
  (dataArr) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-excel-file/employee`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );

      const exelBlob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(
        exelBlob,
        `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`
      );
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadEmployeeTemplateAsExcel = () => async (dispatch) => {
  const token = cookie.get("token");
  // dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
    const body = JSON.stringify({});
    const { data } = await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/storage/create-bulk-template`,
      body,
      config
    );
    const res = await axios.get(
      `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      {
        responseType: "blob",
      }
    );

    const exelBlob = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
    });

    dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

    saveAs(exelBlob, `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`);
  } catch (error) {
    dispatch({
      type: DOWNLOADING_ON_PROCESS_ERROR,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const downloadEmployeeWithNoGradeTemplateAsExcel =
  () => async (dispatch) => {
    const token = cookie.get("token");
    // dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify({});
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-bulk-template/employee-no-grade`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );

      const exelBlob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(
        exelBlob,
        `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`
      );
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadContractBulkEmployeeTemplateExcelFileFunc =
  () => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify({});
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-bulk-template/contract`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );

      const exelBlob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(
        exelBlob,
        `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`
      );
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadPayStructureTemplateExcelFileFunc =
  (type) => async (dispatch) => {
    const token = cookie.get("token");
    // dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify({});
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-paystructure-template?type=${type}`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );

      const exelBlob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(
        exelBlob,
        `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`
      );
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadPositionTemplateExcelFileFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  // dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
    const body = JSON.stringify({});
    const { data } = await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/storage/create-bulk-template/position`,
      body,
      config
    );
    const res = await axios.get(
      `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      {
        responseType: "blob",
      }
    );

    const exelBlob = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
    });

    dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

    saveAs(exelBlob, `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`);
  } catch (error) {
    dispatch({
      type: DOWNLOADING_ON_PROCESS_ERROR,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const downloadBankScheduleExcelFileFunc =
  (bankName, modelType, month, dataArr) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-excel-file/bankschedule?bankName=${bankName}&modelType=${modelType}&month=${month}`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );
      const exelBlob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadPayeScheduleExcelFileFunc =
  (month, year, dataArr) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-excel-file/paye?year=${year}&month=${month}`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );
      const exelBlob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadPensionScheduleExcelFileFunc =
  (month, year, dataArr) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-excel-file/pension?year=${year}&month=${month}`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );
      const exelBlob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
        // payload:
        //   error.response && error.response.data.detail
        //     ? error.response.data.detail
        //     : error.message,
      });
    }
  };

export const downloadBankSchedulePdfFileFunc =
  (
    bank,
    companyBankAcct,
    authorizedBy,
    modelType,
    month,
    ceoSignature,
    dataArr,
    subTotal
  ) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify({
        bankName: bank.name,
        bankAddress: bank.bankAddress,
        bankAcctNumber: companyBankAcct,
        month,
        ceoSignature,
        subTotal,
        authorizedBy,
        results: dataArr,
      });
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-pdf-file/bankschedule?bankName=${bank.name}&modelType=${modelType}&month=${month}`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );
      const exelBlob = new Blob([res.data], {
        type: "application/pdf",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
    } catch (error) {
      // console.log(error?.response);
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail ||
            // error?.response?.data?.status ||
            error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              // error?.response?.data?.status ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
        // payload:
        //   error?.response &&
        //   (error?.response?.data?.detail || error?.response?.data?.errors)
        //     ? error?.response?.data?.detail ||
        //       error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
        //     : error?.message,
      });
    }
  };

export const downloadPayePdfFileFunc =
  (month, dataArr, year) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-pdf-file/paye?month=${month}&year=${year}`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );
      const exelBlob = new Blob([res.data], {
        type: "application/pdf",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadPensionPdfFileFunc =
  (month, dataArr, year) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const { data } = await axios.post(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/create-pdf-file/pension?month=${month}&year=${year}`,
        body,
        config
      );
      const res = await axios.get(
        `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
        {
          responseType: "blob",
        }
      );
      const exelBlob = new Blob([res.data], {
        type: "application/pdf",
      });

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

      saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadAuditLogPdfFileFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
    // const body = JSON.stringify(dataArr);
    const body = JSON.stringify({});
    const { data } = await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/storage/create-pdf-file/auditlogs`,
      body,
      config
    );
    const res = await axios.get(
      `${urlConfig.proxyUrl.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      {
        responseType: "blob",
      }
    );
    const exelBlob = new Blob([res.data], {
      type: "application/pdf",
    });

    dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });

    saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
  } catch (error) {
    dispatch({
      type: DOWNLOADING_ON_PROCESS_ERROR,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};
