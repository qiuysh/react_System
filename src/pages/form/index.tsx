/** @format */

import * as React from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  PageHeader,
} from "antd";
import "./style.less";
const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
class FormComponent extends React.Component<any> {
  render(): React.ReactNode {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <PageHeader className="form-content" title="表单页">
        <Form {...formItemLayout}>
          <FormItem label="规则名称">
            {getFieldDecorator("name")(
              <Input placeholder="规则名称" />,
            )}
          </FormItem>
          <FormItem label="描述">
            {getFieldDecorator("desc")(
              <TextArea placeholder="描述" rows={4} />,
            )}
          </FormItem>
          <Form.Item label="状态">
            {getFieldDecorator("status", {
              initialValue: "a",
            })(
              <Radio.Group>
                <Radio value="a">正常</Radio>
                <Radio value="b">异常</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button>取消</Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </PageHeader>
    );
  }
}
export default Form.create()(FormComponent);
