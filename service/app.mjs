export default class App {

  data_list = ["hello 1", "happi Happi happi"];

  get(res) {
    res.write(JSON.stringify({
      code: 200,
      status: "ok",
      data: this.data_list.map(function (value, index) {
        return {
          index: index,
          value: value
        }
      })
    }));
    res.end();
  }

  create(req, res) {
    req.addListener("data", (data) => {
      const { text } = JSON.parse(data.toString());
      this.data_list.push(text);
      res.write(JSON.stringify({
        code: 201,
        status: "success",
        data: this.data_list.map(function (value, index) {
          return {
            index: index,
            value: value
          }
        })
      }));
    });
  }

  update(req, res) {
    req.addListener("data", function (data) {
      const { id, text } = JSON.parse(data.toString());
      res.write({ id, text });
      res.end();
    });
  }

  delete(req, res) {
    req.addListener("data", function (data) {
      const { id } = JSON.parse(data.toString());
      res.write({ id });
      res.end();
    });
  }

}
