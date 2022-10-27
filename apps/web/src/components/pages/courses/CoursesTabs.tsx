import { Row, Tabs, Col, Card } from "@romalms/design-system";
import { useState } from "react";

export const CoursesTabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <Tabs activeKey={activeTab} defaultActiveKey="1" onChange={setActiveTab}>
      <Tabs.TabPane tab="All courses" key="1">
        <Row gutter={[24, 24]} css={{ paddingLeft: 24, paddingRight: 24 }}>
          {new Array(18).fill(null).map((_, index) => (
            <Col span={6} key={index}>
              <Card loading>
                <Card.Meta
                  avatar="https://joeschmoe.io/api/v1/random"
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Active" key="2">
        <Row gutter={[24, 24]} css={{ paddingLeft: 24, paddingRight: 24 }}>
          {new Array(5).fill(null).map((_, index) => (
            <Col span={6} key={index}>
              <Card loading>
                <Card.Meta
                  avatar="https://joeschmoe.io/api/v1/random"
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Upcoming" key="3">
        <Row gutter={[24, 24]} css={{ paddingLeft: 24, paddingRight: 24 }}>
          {new Array(3).fill(null).map((_, index) => (
            <Col span={6} key={index}>
              <Card loading>
                <Card.Meta
                  avatar="https://joeschmoe.io/api/v1/random"
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Finished" key="4">
        <Row gutter={[24, 24]} css={{ paddingLeft: 24, paddingRight: 24 }}>
          {new Array(6).fill(null).map((_, index) => (
            <Col span={6} key={index}>
              <Card loading>
                <Card.Meta
                  avatar="https://joeschmoe.io/api/v1/random"
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Tabs.TabPane>
    </Tabs>
  );
};
