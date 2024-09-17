export default class App {
  data_list = ["hello 1", "happi Happi happi"];

  get(res) {
    res.write(JSON.stringify({
      code: 200,
      status: "ok",
      data: this.data_list.map((value, index) => ({
        id: index,
        value: value
      }))
    }));
    res.end();
  }

  create(req, res) {
    const { text } = req.body;
    console.log(text);
    if (!text) {
      res.write(JSON.stringify({
        code: 400,
        status: "error",
        message: "Text is required."
      }));
      res.end();
      return;
    }
    this.data_list.push(text);
    res.write(JSON.stringify({
      code: 201,
      status: "success",
      data: this.data_list.map((value, index) => ({
        id: index,
        value: value
      }))
    }));
    res.end();
  }

  update(req, res) {
    const { id, text } = req.body;

    if (id === undefined || !text) {
      res.write(JSON.stringify({
        code: 400,
        status: "error",
        message: "ID and text are required."
      }));
      res.end();
      return;
    }

    if (this.data_list[id] === undefined) {
      res.write(JSON.stringify({
        code: 404,
        status: "error",
        message: "Item not found"
      }));
    } else {
      this.data_list[id] = text;
      res.write(JSON.stringify({
        code: 200,
        status: "success",
        data: this.data_list.map((value, index) => ({
          id: index,
          value: value
        }))
      }));
    }
    res.end();
  }

  delete(req, res) {
    const { id } = req.body;

    if (id === undefined) {
      res.write(JSON.stringify({
        code: 400,
        status: "error",
        message: "ID is required."
      }));
      res.end();
      return;
    }

    if (this.data_list[id] === undefined) {
      res.write(JSON.stringify({
        code: 404,
        status: "error",
        message: "Item not found"
      }));
    } else {
      this.data_list.splice(id, 1);
      res.write(JSON.stringify({
        code: 200,
        status: "success",
        data: this.data_list.map((value, index) => ({
          id: index,
          value: value
        }))
      }));
    }
    res.end();
  }
}

