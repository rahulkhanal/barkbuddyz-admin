import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Notification from "../components/Modal/Notification";
import { useState } from "react";
import { addMember } from "../redux/authRedux";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import axios from "axios"
import { BASE_URL } from "../request";

const Container = styled.div`
  margin: auto;
  width: 90vw;
  max-width: 1000px;
`;
const BackButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
const Back = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  align-items: center;
  color: grey;
  font-size: 0.9rem;
  &:hover {
    color: black;
  }
`;
const Title = styled.h1`
  padding-top: 55px;
  font-weight: 300;
  ${mobile({ paddingTop: "30px" })}
`;

const TextContainer = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
`;
const Text = styled.span`
  margin-left: 5px;
  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  min-width: 250px;
  width: 400px;
  max-width: 500px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid gray;
`;
const Category = styled.div`
  margin: 10px 0;
`;
const CategoryLabel = styled.label`
  display: block;
  padding-left: 15px;
  text-indent: -15px;
  font-size: 13px;
  color: #555;
  cursor: pointer;
`;
const CategoryInput = styled.input`
  width: 15px;
  height: 15px;
  padding: 0;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  cursor: pointer;
`;
const Action = styled.div``;
const Button = styled.button`
  border: none;
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 14px;
  &:disabled {
    background-color: #f8f8f8;
    color: black;
    cursor: not-allowed;
  }
`;

const NewTrainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const [admin, setAdmin] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const checkPassword = () => {
    if (password !== confirmPassword) {
      return false;
    } else if (password.length < 8) {
      return false;
    }
    return true;
  };

  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    setAdd(true);
    e.preventDefault();
    setLoading(true);
    const newAdmin = { ...inputs };
    try {
      const res = await axios.post(`${BASE_URL}trainer`, newAdmin)
      if (res.status == 200) {
        navigate("/trainer")
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Notification open={add} setOpen={setAdd} type="add" />
      <Title>NEW Trainer</Title>
      <TextContainer style={{ paddingTop: "20px" }}>
        <BackButton>
          <Back
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
            <Text>back</Text>
          </Back>
        </BackButton>
      </TextContainer>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="name"
            required
            onChange={handleInput}
            minLength={2}
          />

          <Input
            name="degree"
            type="text"
            placeholder="degree"
            required
            onChange={handleInput}
            minLength={2}
          />
          <Input
            name="info"
            type="text"
            placeholder="info"
            required
            onChange={handleInput}
            minLength={2}
          />
          <Input
            name="contact"
            type="number"
            placeholder="contact"
            required
            onChange={handleInput}
            minLength={2}
          />

          <Action>
            <Button type="submit" disabled={loading ? true : false}>
              Add
            </Button>
          </Action>
        </Form>
      </Wrapper>
    </Container>
  );
};
export default NewTrainer