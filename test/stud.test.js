const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const url = 'http://localhost:5000';
var agent = chai.request.agent(url);


describe('# Student test', () => {
    const classCode = "loy4au"
    describe('ClassAdd & Delete test', () => {
        it('클래스 목록에 추가 성공', done => {
            agent.post('/users/login')
            .type('form')
            .send({
                'email': 'testS@email.com',
                'password': 'qwe123'
            })
            .end((err, res) => {
                agent.get(`/stud/${classCode}/classAdd`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.text).to.be.an('String');
                    done();
                })
            })

        });
        it('클래스목록에서 삭제 성공', done => {
            agent.delete(`/stud/${classCode}/delete`)
            .type('form')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.equal(true);
                done();
            })
        });
    });
    describe('Question Add test', () => {
        it('질문하기 성공', done => {
            agent.post('/users/login')
                .type('form')
                .send({
                    'email': 'testS@email.com',
                    'password': 'qwe123'
                })
                .end((err, res) => {
                    agent.post(`/stud/:m154c7/questionAdd`)
                        .type('form')
                        .send({
                            'question':'Is this not anonymous?',
                            'anonymous': false
                        })
                        .end((err, res) => {
                            expect(err).to.be.null;
                            expect(res.text).to.be.an('String');
                            done();
                        })
                })
        });
        it('익명 질문하기 성공', done => {
            agent.post('/users/login')
                .type('form')
                .send({
                    'email': 'testS@email.com',
                    'password': 'qwe123'
                })
                .end((err, res) => {
                    agent.post(`/stud/:m154c7/questionAdd`)
                        .type('form')
                        .send({
                            'question':'Is this anonymous?',
                            'anonymous': true
                        })
                        .end((err, res) => {
                            expect(err).to.be.null;
                            expect(res.text).to.be.an('String');
                            done();
                        })

                })

        });
    });

})