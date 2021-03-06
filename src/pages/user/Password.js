import React, { useState } from "react";

import { Button, Row, Col, Card, Input, Form } from "antd";

import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import Loading from "../../components/loading/Loading";
import Notification from "../../components/notification/Notification";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        Notification("success", "Đổi mật khẩu thành công!");
      })
      .catch((err) => {
        setLoading(false);
        Notification("error", "Đã có lỗi xảy ra, vui lòng thử lại!");
      });
  };

  const passwordUpdateForm = () => (
    <Form onFinish={handleSubmit}>
      <Col span={10}>
        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3"
          placeholder="Nhập mật khẩu mới"
          disabled={loading}
          value={password}
        />
        <Button
          type="primary"
          size="middle"
          onClick={handleSubmit}
          className="mt-3"
        >
          Xác nhận
        </Button>
      </Col>
    </Form>
  );

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <UserNav />
        </Col>
        <Col span={19} className="pl-5">
          {loading ? (
            <h4>
              Đổi mật khẩu <Loading />
            </h4>
          ) : (
            <h4>Đổi mật khẩu</h4>
          )}

          <hr />
          <Card>
            <h6>
              Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
              khác
            </h6>
            {passwordUpdateForm()}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Password;
