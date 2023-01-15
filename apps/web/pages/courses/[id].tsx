import { LayoutType } from "@/components/Layout";
import { privatePage } from "@/router";
import { NextPageWithLayout } from "../_app";
import {
  Col,
  Row,
  Divider,
  List,
  Calendar,
  Card,
  Image,
  Typography,
} from "@romalms/design-system";

const SingleCourse: NextPageWithLayout = () => {
  return (
    <>
      <Row gutter={24} css={{ paddingLeft: 24, paddingRight: 24 }}>
        <Col span={16}>
          <Divider orientation="center">
            <Typography.Title>
              <h2>React Course</h2>
            </Typography.Title>
          </Divider>
          <Card>
            <h3>What you'll learn</h3>
            <List>
              Build powerful, fast, user-friendly and reactive web apps
            </List>
            <List>
              Apply for high-paid jobs or work as a freelancer in one the
              most-demanded sectors you can find in web dev right now
            </List>
            Provide amazing user experiences by leveraging the power of
            JavaScript with ease
            <List>Learn all about React Hooks and React Components</List>
          </Card>
          <Row gutter={16}></Row>
        </Col>
        <Col span={8}>
          {/* <Divider orientation="center">Course React</Divider> */}
          <Image
            src="https://www.freecodecamp.org/news/content/images/2022/02/image-76.png"
            width={500}
            height={300}
            alt="Course image"
          />
        </Col>
      </Row>
      <Row gutter={24} css={{ paddingLeft: 24, paddingRight: 24 }}>
        <Col span={8}>
          <h1>TESTTTTTTTTTTTTTTT</h1>
        </Col>
      </Row>
    </>
  );
};

SingleCourse.layout = LayoutType.DASHBOARD;

export default privatePage(SingleCourse);
