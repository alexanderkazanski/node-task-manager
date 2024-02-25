const request = require("supertest");
const app = require("../src/app");
const { userOneId, userOne, userTwo, setupDatabase } = require("./fixtures/db");
const Task = require("../src/models/task");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From my test",
    })
    .expect(200);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});


test("Should fetch user tasks", async () => {
    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
    expect(response.body).toHaveLength(2)
})

test("Should fail on deleted other user tasks", async () => {
    const tasks = await Task.find({owner: userOneId})
    await request(app).delete(`/tasks/${tasks[0]._id}`).set('Authorization', `Bearer ${userTwo.tokens[0].token}`).expect(404)
    expect(await Task.find({owner: userOneId })).toHaveLength(1)
    
})