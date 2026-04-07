import React from "react";
import { Form, Input, InputNumber, Button, Select, Card, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useAddTaskMutation } from "../../../redux/services/taskApiServices/taskApiServices";

const { Option } = Select;

const AddTask = () => {
  const { control, handleSubmit, reset } = useForm();

  // RTK Query mutation
  const [addTask, { isLoading }] = useAddTaskMutation();

  const onSubmit = async (data) => {
    try {
      await addTask(data).unwrap(); // RTK Query mutation call
      message.success("Task added successfully ✅");
      reset();
    } catch (err) {
      console.error(err);
      message.error("Failed to add task ❌");
    }
  };

  return (
    <Card title="Add New Task" style={{ maxWidth: 600, margin: "auto" }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Icon */}
        <Form.Item label="Icon">
          <Controller
            name="icon"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} placeholder="⭐" />}
          />
        </Form.Item>

        {/* Title */}
        <Form.Item label="Task Title">
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} placeholder="Rate Mobile App" />}
          />
        </Form.Item>

        {/* Reward */}
        <Form.Item label="Reward Amount">
          <Controller
            name="reward"
            control={control}
            render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} min={0} />}
          />
        </Form.Item>

        {/* Label */}
        <Form.Item label="Button Label">
          <Controller
            name="label"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Rate App" />}
          />
        </Form.Item>

        {/* Gradient */}
        <Form.Item label="Gradient">
          <Controller
            name="gradient"
            control={control}
            render={({ field }) => <Input {...field} placeholder="linear-gradient(135deg,#f59e0b,#d97706)" />}
          />
        </Form.Item>

        {/* Task Type */}
        <Form.Item label="Task Type">
          <Controller
            name="type"
            control={control}
            defaultValue="link"
            render={({ field }) => (
              <Select {...field}>
                <Option value="link">Link Task</Option>
                <Option value="video">Video Task</Option>
                <Option value="app">App Install</Option>
                <Option value="review">Review Task</Option>
              </Select>
            )}
          />
        </Form.Item>

        {/* URL */}
        <Form.Item label="Task URL">
          <Controller
            name="url"
            control={control}
            render={({ field }) => <Input {...field} placeholder="https://example.com" />}
          />
        </Form.Item>

        {/* Duration */}
        <Form.Item label="Duration (Seconds)">
          <Controller
            name="duration"
            control={control}
            render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={isLoading}>
          Add Task
        </Button>
      </Form>
    </Card>
  );
};

export default AddTask;