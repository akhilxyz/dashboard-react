import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { GetService } from "src/api/service";

const AddUserForm = (props) => {
  const initUser = {
    id: null,
    name: "",
    status: "",
    startDate: "",
    expiryDate: "",
    servicelink: "",
  };

  const [user, setUser] = useState(initUser);
  const [serviceList, setServiceList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name && user.status && user.startDate && user.expiryDate) {
      handleChange(e, props.addService(user));
      setUser(initUser);
    }
    else{
        NotificationManager.error("Please Fill The Details ", "Info", 2000);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setUser(initUser);
  };

  useEffect(async () => {
    let rs = await GetService();
    if(rs){
      setServiceList(rs);
    }
  }, []);
  console.log("Ss", serviceList);

  return (
    <Form>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              className="u-full-width"
              type="select"
              value={user.name}
              name="name"
              onChange={handleChange}
            >
              <option value="">Select Service</option>

              {serviceList.map((it) => {
                return (
                  <option value={it.id} key={it.id}>
                    {it.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label>Started On</Label>
            <Input
              className="u-full-width"
              type="date"
              placeholder="date placeholder"
              value={user.startDate}
              name="startDate"
              x
              onChange={handleChange}
            />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label>Expiry Date</Label>
            <Input
              className="u-full-width"
              type="date"
              placeholder="date placeholder"
              value={user.expiryDate}
              name="expiryDate"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label>Links</Label>
            <Input
              className="u-full-width"
              type="textarea"
              value={user.servicelink}
              name="servicelink"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label>Status</Label>
            <Input
              className="u-full-width"
              type="select"
              value={user.status}
              name="status"
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Banned">Banned</option>
            </Input>
          </FormGroup>
        </Col>

        <Col md={4}>
          <Button
            className="button-primary"
            style={{ margin: "24px", minWidth: "120px" }}
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </Button>

          <Button
            className="button-primary"
            style={{ margin: "24px", minWidth: "120px" }}
            type="submit"
            onClick={handleClear}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddUserForm;
