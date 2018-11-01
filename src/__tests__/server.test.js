import App from "../../server/app"
import request from "request"
import fp from "find-free-port"
import fs from "fs"

let serverUrl
const jsonHeader = { "content-type": "application/json" }

describe("App server", () => {
  let server
  beforeAll(done => {
    fp(3000, 10000, function(_r, port) {
      serverUrl = `http://localhost:${port}`
      server = App.listen(port, done)
    })
  })

  afterAll(done =>
    server.close(() => {
      fs.unlinkSync("db.test.json")
      done()
    }))

  describe("with invalid content-type any request return status code 415", () => {
    it("get /", done => {
      request.get({ url: serverUrl }, (_e, response) => {
        expect(response.statusCode).toBe(415)
        done()
      })
    })
    it("post /login", done => {
      request.post({ url: serverUrl + "/login" }, (_e, response) => {
        expect(response.statusCode).toBe(415)
        done()
      })
    })
  })

  describe("Create user", () => {
    describe("post /user with valid credentials return", () => {
      let response
      beforeAll(done => {
        const options = {
          body: { email: "test10@test.ru", password: "1234567" },
          headers: jsonHeader,
          json: true,
          url: serverUrl + "/user"
        }
        request.post(options, (_e, r) => {
          response = r
          done()
        })
      })

      it("status 201", () => expect(response.statusCode).toBe(201))
      it("valid jwt token", () => expect(/\S+\.\S+\.\S+/.test(response.body.token)).toBeTruthy())
      it("body has key user", () => expect(response.body.user).toBeDefined())
      it("user that containing email and id", () =>
        expect(Object.keys(response.body.user)).toEqual(expect.arrayContaining(["email", "id"])))
      it("email equal to email of sended data", () =>
        expect(response.body.user.email).toEqual("test10@test.ru"))
    })
    describe("post /user with exist credentials return", () => {
      let response
      beforeAll(done => {
        const options = {
          body: { email: "test@test.ru", password: "1234567" },
          headers: jsonHeader,
          json: true,
          url: serverUrl + "/user"
        }
        request.post(options, () => {
          request.post(options, (_e, r) => {
            response = r
            done()
          })
        })
      })

      it("status 409", () => expect(response.statusCode).toBe(409))
      it("body has key token", () => expect(response.body.message).toBeDefined())
      it("error is 'user alredy exist'", () =>
        expect(response.body.message).toBe("user alredy exist"))
    })
    describe("post /user with partial credentials", () => {
      it("status 422 without email", done => {
        const options = {
          body: { password: "1234567" },
          headers: jsonHeader,
          json: true,
          url: serverUrl + "/user"
        }
        request.post(options, (_e, r) => {
          expect(r.statusCode).toBe(422)
          done()
        })
      })
      it("status 422 without password", done => {
        const options = {
          body: { password: "1234567" },
          headers: jsonHeader,
          json: true,
          url: serverUrl + "/user"
        }
        request.post(options, (_e, r) => {
          expect(r.statusCode).toBe(422)
          done()
        })
      })
    })
  })

  describe("Authorize user", () => {
    let response
    const body = { email: "test2123123@test.ru", password: "12345672123123" }
    beforeAll(done => {
      const options = {
        body,
        headers: jsonHeader,
        json: true,
        url: serverUrl + "/user"
      }
      request.post(options, (_e, r) => {
        request.post(
          {
            url: serverUrl + "/session",
            json: true,
            headers: { ...jsonHeader },
            body
          },
          (_e, r) => {
            response = r
            done()
          }
        )
      })
    })
    describe("POST /session", () => {
      it("return 200", () => expect(response.statusCode).toBe(200))
      it("return email and password", () => {
        expect(Object.keys(response.body.user)).toEqual(expect.arrayContaining(["email", "id"]))
      })
    })
  })

  describe("Read user profile after registration", () => {
    let response
    beforeAll(done => {
      const options = {
        body: { email: "test2@test.ru", password: "12345672" },
        headers: jsonHeader,
        json: true,
        url: serverUrl + "/user"
      }
      request.post(options, (_e, r) => {
        request.get(
          {
            url: serverUrl + "/user/me",
            json: true,
            headers: { ...jsonHeader, Authorization: `Bearer ${r.body.token}` }
          },
          (_e, r) => {
            response = r
            done()
          }
        )
      })
    })
    describe("GET /user/me return", () => {
      it("return 200", () => expect(response.statusCode).toBe(200))
      it("return email and password", () => {
        expect(Object.keys(response.body)).toEqual(expect.arrayContaining(["email", "id"]))
      })
    })
  })
})
