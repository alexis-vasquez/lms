import { useQueryState } from "@/hooks/useQueryState";
import { Row, Tabs, Col, Card } from "@romalms/design-system";

export enum CourseTabsEnum {
  AllCourses = "all",
  Active = "active",
  Upcoming = "upcoming",
  Completed = "completed",
}

export const CoursesTabs = () => {
  const [query, setQuery] = useQueryState<{ status: CourseTabsEnum }>();

  return (
    <Tabs
      defaultActiveKey={query.status}
      activeKey={query.status}
      onChange={(status) => setQuery({ status: status as CourseTabsEnum })}
    >
      <Tabs.TabPane
        tab={CourseTabsEnum.AllCourses}
        key={CourseTabsEnum.AllCourses}
      >
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
      <Tabs.TabPane tab={CourseTabsEnum.Active} key={CourseTabsEnum.Active}>
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
      <Tabs.TabPane tab={CourseTabsEnum.Upcoming} key={CourseTabsEnum.Upcoming}>
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
      <Tabs.TabPane
        tab={CourseTabsEnum.Completed}
        key={CourseTabsEnum.Completed}
      >
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
