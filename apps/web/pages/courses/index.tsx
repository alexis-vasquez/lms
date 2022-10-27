import { LayoutType } from "@/components/Layout";
import { CoursesTabs } from "@/components/pages/courses/CoursesTabs";
import { privatePage } from "@/router";
import {
  Carousel,
  Col,
  Divider,
  Input,
  Row,
  Select,
} from "@romalms/design-system";
import { NextPageWithLayout } from "../_app";

const contentStyle: React.CSSProperties = {
  height: "240px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Courses: NextPageWithLayout = () => {
  return (
    <Row>
      <Col span={24}>
        <Carousel autoplay>
          {new Array(3).fill(null).map((_, index) => (
            <div key={index}>
              <h3 style={contentStyle}>{index}</h3>
            </div>
          ))}
        </Carousel>
      </Col>
      <Col span={24}>
        <Row gutter={24} css={{ paddingLeft: 24, paddingRight: 24 }}>
          <Col span={6}>
            <Divider orientation="left">Sort by</Divider>
            <Select css={{ width: 200 }}>
              <Select.Option value="1">Option 1</Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
              <Select.Option value="3">Option 3</Select.Option>
            </Select>
          </Col>
          <Col span={12}>
            <Divider orientation="left">Filter by</Divider>
            <Select
              css={{ width: 200, marginRight: 24 }}
              placeholder="Categories"
              showSearch
              mode="multiple"
            >
              <Select.Option value="1">Option 1</Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
              <Select.Option value="3">Option 3</Select.Option>
            </Select>
            <Select css={{ width: 200 }} placeholder="Instructor" showSearch>
              <Select.Option value="1">Option 1</Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
              <Select.Option value="3">Option 3</Select.Option>
            </Select>
          </Col>
          <Col span={6}>
            <Divider orientation="left">Search</Divider>
            <Input.Search css={{ width: 200 }} />
          </Col>
        </Row>
      </Col>
      <Col span={24} css={{ marginTop: 16 }}>
        <Row gutter={24} css={{ paddingLeft: 24, paddingRight: 24 }}>
          <Col span={24}>
            <CoursesTabs />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

Courses.layout = LayoutType.DASHBOARD;

export default privatePage(Courses);
