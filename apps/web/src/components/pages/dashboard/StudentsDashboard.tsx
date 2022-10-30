import {
  Col,
  Row,
  Divider,
  List,
  Calendar,
  Card,
} from "@romalms/design-system";

export const StudentsDashboard = () => {
  return (
    <Row gutter={24} css={{ paddingLeft: 24, paddingRight: 24 }}>
      <Col span={16}>
        <Divider orientation="left">Courses</Divider>
        <Row gutter={16}>
          {new Array(3).fill(null).map((_, index) => (
            <Col span={8} key={index}>
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
        <Row gutter={16}>
          <Col span={12}>
            <Divider orientation="left">Activity</Divider>
            <List />
          </Col>
          <Col span={12}>
            <Divider orientation="left">Statistics</Divider>
            <List />
            <Divider orientation="left">Badges</Divider>
            <List />
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Divider orientation="left">Calendar</Divider>
        <Calendar fullscreen={false} />
        <Divider orientation="left">Upcoming tasks</Divider>
        <List />
      </Col>
    </Row>
  );
};
