import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  useMemo
} from "react";
import { Button, Modal } from "antd";
import { Manage } from "./manage";
import { Test } from "./test";
import { Switch, Route } from "react-router-dom";
import { getProjects } from "../../api/apiProject";
import "./api.scss";
import { ApiCtx, TeamCtx } from "./../home/home";
import { apiManageReducer } from "./../../reducer/apiManageReducer";
import format from "../../until/format";
import { apiTestReducer } from "./../../reducer/apiTestReducer";
import { ManageModal } from "./modal/manageModal";
import { TestModal } from "./modal/testModal";
export function Api(props) {
  const key = useContext(ApiCtx);
  const teamInfo = useContext(TeamCtx);
  const [manageList, manageDispatch] = useReducer(apiManageReducer);
  const [testList, testDispatch] = useReducer(apiTestReducer);
  const [mode, setMode] = useState("new");
  const [modalShow, setModalShow] = useState(false);
  const [info, setInfo] = useState({});
  const title = useMemo(() => {
    return `${mode === "new" ? "新建" : "修改"}${
      key !== "3" ? "项目" : "自动化测试"
    }`;
  }, [mode, key]);
  useEffect(() => {
    if (key && teamInfo.id) {
      getProjects({
        teamId: teamInfo.id
      }).then(res => {
        const list = res.list.map(item => {
          return Object.assign({}, item, {
            key: item.id,
            updatedAt: format(item.updatedAt)
          });
        });
        manageDispatch({ type: "INIT", list: list });
      });
    }
  }, [key, teamInfo]);
  const handleNew = () => {
    setInfo({});
    setMode("new");
    setModalShow(true);
  };
  const handleModify = info => {
    setInfo(info);
    setMode("modify");
    setModalShow(true);
  };
  const hideModal = () => {
    setModalShow(false);
  };
  return (
    <>
      <p>{key !== "3" ? "API研发管理" : "API自动化测试"}</p>
      <Button type="primary" icon="plus" onClick={handleNew}>
        新建
      </Button>
      <Switch>
        <Route
          path={`${props.match.url}/manage`}
          render={({ history }) => (
            <Manage
              list={manageList}
              dispatch={manageDispatch}
              history={history}
              id={teamInfo.id}
              modify={handleModify}
            />
          )}
        />
        <Route
          path={`${props.match.url}/test`}
          render={({ history }) => (
            <Test
              list={testList}
              dispatch={testDispatch}
              history={history}
              id={teamInfo.id}
              modify={handleModify}
            />
          )}
        />
      </Switch>
      <Modal visible={modalShow} footer={null} title={title} closable={false}>
        {key !== "3" ? (
          <ManageModal
            hideModal={hideModal}
            key={key}
            dispatch={props.manageDispatch}
            id={props.id}
            mode={mode}
            info={info}
          />
        ) : (
          <TestModal
            hideModal={hideModal}
            key={key}
            dispatch={props.testDispatch}
            id={props.id}
            mode={mode}
            info={info}
          />
        )}
      </Modal>
    </>
  );
}
