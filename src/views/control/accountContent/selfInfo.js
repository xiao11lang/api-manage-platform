import React, { useContext, useState } from "react";
import { Button, Input, Icon, Select, Upload, Modal } from "antd";
import { InfoRow } from "./infoRow";
import { UserCtx } from "../../../App";
import { update,uploadAvatar } from "./../../../api/user";
const Option = Select.Option;
function getBase64(file,callback) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const fd=new FormData()
    fd.append('file',file)
    fd.append('id',1)
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback()
      uploadAvatar(fd)
      resolve(reader.result);
    }
    reader.onerror = error => reject(error);
  });
}
export function SelfInfo() {
  const { userInfo, setUserInfo } = useContext(UserCtx);
  const [sex, setSex] = useState("");
  const [name, setName] = useState();
  const [uploaded,setUploaded]=useState(false)//图片是否上传成功
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const handleNameChange = e => {
    setName(e.target.value);
  };
  const save = () => {
    const data = {
      id: userInfo.id,
      sex: sex||userInfo.sex,
      name: name || userInfo.name
    };
    update(data).then(res => {
      setUserInfo(data);
      Modal.success({
        content: res.detail,
        centered: true
      });
    });
  };
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = () => {
    setPreviewVisible(true);
  };

  const handleChange = async ({ file,fileList }) => {
    let url = await getBase64(file,setUploaded.bind(null,true));
    setUploaded(true);
    setPreviewImage(url);
  };
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传</div>
    </div>
  );
  return (
    <>
      <InfoRow style={{ margin: "20px 0" }} label="头像">
        <div className='upload-con'>
          <img src={userInfo.avatar} alt="avatar" onClick={handlePreview}/>
          <Upload
            listType="picture-card"
            fileList={[]}
            beforeUpload={()=>{return false}}
            onChange={handleChange}
            data={{ id: userInfo.id }}
          >
            {uploadButton}
          </Upload>
        </div>
      </InfoRow>
      <InfoRow style={{ marginBottom: 20 }} label="姓名">
        <Input
          placeholder={userInfo.name}
          style={{ width: 250 }}
          onChange={handleNameChange}
        />
      </InfoRow>
      <InfoRow label="性别" style={{ marginBottom: 20 }}>
        <Select
          defaultValue={userInfo.sex}
          style={{ width: 250 }}
          onSelect={value => setSex(value)}
        >
          <Option value="male">男</Option>
          <Option value="female">女</Option>
          <Option value="unknown">未知</Option>
        </Select>
      </InfoRow>
      <InfoRow>
        <Button onClick={save}>保存</Button>
      </InfoRow>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}
