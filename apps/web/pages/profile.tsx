import { LayoutType } from "@/components/Layout";
import { privatePage } from "@/router";
import { useUserService } from "@/services/UserService";
import { padId } from "@/utils/strings";
import {
  Button,
  Col,
  Divider,
  Image,
  List,
  Row,
  Typography,
} from "@romalms/design-system";
import { NextPageWithLayout } from "./_app";

const Profile: NextPageWithLayout = () => {
  const UserService = useUserService();
  const { data } = UserService.useProfileQuery();

  if (!data) return null;

  return (
    <div css={{ padding: 24 }}>
      <Row gutter={24}>
        <Col>
          <Image
            src="https://joeschmoe.io/api/v1/random"
            width={200}
            height={200}
            alt="Profile image"
          />
        </Col>
        <Col css={{ display: "flex", flexDirection: "column" }} flex={1}>
          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Typography.Title level={3}>
              {`${data?.me.firstName} ${data?.me.lastName}`}
              <Typography.Text type="secondary" css={{ marginLeft: 8 }}>
                [{padId(data.me.id)}]
              </Typography.Text>
            </Typography.Title>
            <Button onClick={() => alert("TODO")}>EDIT</Button>
          </div>
          <div>TAGS</div>
          <div>
            <Typography.Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam,
              doloribus.
            </Typography.Paragraph>
          </div>
        </Col>
      </Row>
      <Divider />
      <List itemLayout="horizontal" />
      <Row>
        <Col span={12}>
          <Divider>Statistics</Divider>
          <List />
        </Col>
        <Col span={12}>
          <Divider>Contact details</Divider>
          <List />
        </Col>
      </Row>
    </div>
  );
};

Profile.layout = LayoutType.DASHBOARD;

export default privatePage(Profile);
