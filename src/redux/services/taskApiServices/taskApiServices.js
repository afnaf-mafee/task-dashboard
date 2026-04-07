import { baseApi } from "../../api/baseApi";

export const taskApiServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 1️⃣ Fetch all tasks
    getTasks: build.query({
      query: (searchTitle = "") => {
        const query = searchTitle ? `?title=${searchTitle}` : "";
        return `/tasks${query}`;
      },
      providesTags: ["Tasks"],
    }),

    // 2️⃣ Fetch single task by ID
    getSingleTask: build.query({
      query: (taskId) => `/tasks/${taskId}`,
      providesTags: (result, error, taskId) => [{ type: "Tasks", id: taskId }],
    }),

    // 3️⃣ Add new task
    addTask: build.mutation({
      query: (taskData) => ({
        url: `/tasks`,
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"], // invalidate tasks cache
    }),

    // 4️⃣ Delete task
    deleteTask: build.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),

    // 5️⃣ Update task status (active/inactive)
 updateTask: build.mutation({
  query: ({ taskId, ...body }) => ({
    url: `/tasks/${taskId}`,
    method: "PATCH", // or PATCH
    body: body,
  }),
  invalidatesTags: ["Tasks"], // so table refetches
}),
  }),
});

export const {
  useGetTasksQuery,
  useGetSingleTaskQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation
} = taskApiServices;