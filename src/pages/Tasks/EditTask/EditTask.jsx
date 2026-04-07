import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, Card, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleTaskQuery,
  useUpdateTaskMutation,
  
} from "../../../redux/services/taskApiServices/taskApiServices";

const { Option } = Select;

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      icon: "",
      title: "",
      reward: 0,
      label: "",
      gradient: "",
      type: "link",
      url: "",
      duration: 0,
    },
  });

  // Fetch single task by ID
  const { data: task, isLoading } = useGetSingleTaskQuery(taskId);

  // Mutation to update task
  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();

  // Prefill form when task data is fetched
  useEffect(() => {
    if (task && task.data) {
      reset({
        icon: task.data.icon || "",
        title: task.data.title || "",
        reward: task.data.reward || 0,
        label: task.data.label || "",
        gradient: task.data.gradient || "",
        type: task.data.type || "link",
        url: task.data.url || "",
        duration: task.data.duration || 0,
      });
    }
  }, [task, reset]);

  const onSubmit = async (data) => {
    try {
      await updateTask({ taskId, ...data }).unwrap();
      message.success("Task updated successfully ✅");
    //   navigate("/task");
    } catch (err) {
      console.error(err);
      message.error("Failed to update task ❌");
    }
  };

  return (
    <Card title="Edit Task" style={{ maxWidth: 600, margin: "auto" }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Icon">
          <Controller
            name="icon"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} placeholder="⭐" />}
          />
        </Form.Item>

        <Form.Item label="Task Title">
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} placeholder="Rate Mobile App" />}
          />
        </Form.Item>

        <Form.Item label="Reward Amount">
          <Controller
            name="reward"
            control={control}
            render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} min={0} />}
          />
        </Form.Item>

        <Form.Item label="Button Label">
          <Controller
            name="label"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Rate App" />}
          />
        </Form.Item>

        <Form.Item label="Gradient">
          <Controller
            name="gradient"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="linear-gradient(135deg,#f59e0b,#d97706)" />
            )}
          />
        </Form.Item>

        <Form.Item label="Task Type">
          <Controller
            name="type"
            control={control}
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

        <Form.Item label="Task URL">
          <Controller
            name="url"
            control={control}
            render={({ field }) => <Input {...field} placeholder="https://example.com" />}
          />
        </Form.Item>

        <Form.Item label="Duration (Seconds)">
          <Controller
            name="duration"
            control={control}
            render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={updating || isLoading}>
          Update Task
        </Button>
      </Form>
    </Card>
  );
};

export default EditTask;