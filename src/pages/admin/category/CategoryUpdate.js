import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { useSelector } from "react-redux";

import { getCategory, updateCategory } from "../../../functions/category";
import AdminNav from "../../../components/nav/AdminNav";
import Loading from "../../../components/loading/Loading";
import CategoryForm from "../../../components/form/CategoryForm";
import Notification from "../../../components/notification/Notification"

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: "0",
    });
  });

  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.category.name));

  const handleSubmit = () => {
    setLoading(true);

    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        Notification('success', `Danh mục "${res.data.name}" đã được cập nhật.`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) Notification('error', Notification("error", "Đã có lỗi xảy ra, vui lòng thử lại!"));
      });
  };

  return (
    <div className="container pt-5 pb-5">
      <Row>
        <Col span={5}>
          <AdminNav />
        </Col>
        <Col span={19} className="pl-5">
          {loading ? (
            <h4>
              Sửa danh mục <Loading />
            </h4>
          ) : (
            <h4>Sửa danh mục</h4>
          )}
          <hr />
          <Card>
            <h6>Tên danh mục</h6>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              placeholder="Nhập tên danh mục"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryUpdate;
