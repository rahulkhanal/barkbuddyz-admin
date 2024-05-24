import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddIcon from "@mui/icons-material/Add";
import Warning from "../components/Modal/Warning";
import { mobile } from "../responsive";
import MetaData from "../metadata";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useEffect } from "react";
import axios from "axios"
import { BASE_URL } from "../request";
import { useState } from "react";


const Container = styled.div``;

const MainContainer = styled.div`
  margin: auto;
  width: 90vw;
  max-width: 1000px;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
`;

const Button = styled.div`
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


const Trainer = () => {
    const navigate = useNavigate();
    const [dta, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}trainer`);
                setData(res.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [loading]);
    async function handleSubmit(id) {
        const confirmed = window.confirm("Do you want to delete?");
        if (confirmed) {
            try {
                await axios.delete(`${BASE_URL}trainer/${id}`);
                setLoading(prev => !prev);
            } catch (error) {
                console.error("Error deleting trainer:", error);
            }
        }
    }
    return (
        <Container>
            <MetaData title="USER" />
            <Warning />
            <MainContainer>
                <Title>ALL Trainer</Title>
                <TextContainer style={{ paddingTop: "20px" }}>
                    <Left>
                        <Button
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
                            <Text>back</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button
                            onClick={() => {
                                navigate("/newtrainer");
                            }}
                        >
                            <AddIcon />
                            <Text>New Trainer</Text>
                        </Button>
                    </Right>
                </TextContainer>
            </MainContainer>
            <center>
                <div style={{ border: "1px solid black", width: "fit-content", textAlign: "center" }}>
                    <table style={{ width: "700px", padding: "10px" }}>
                        <thead style={{ borderBottom: "10px solid black", padding: "7px" }}>
                            <tr>
                                <th>Name</th>
                                <th>Degree</th>
                                <th>Contact</th>
                                <th>Info</th>
                                <th>Delete Vet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dta.length > 0 ? (
                                dta.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.degree}</td>
                                        <td>{item.contact}</td>
                                        <td>{item.info}</td>
                                        <td><RiDeleteBin3Line onClick={() => handleSubmit(item._id)} /></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </center>
        </Container>
    );
}

export default Trainer