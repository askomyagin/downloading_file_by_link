import styled from '@emotion/styled';
import { Formik } from 'formik';
import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { saveFileApi } from './service';

type FormItem = {
    link: string;
};

function App() {
    const [errorLink, setErrorLink] = useState<boolean>(false);
    const initialValues: FormItem = {
        link: '',
    };

    const validationSchema = yup.object({
        link: yup.string().url().nullable().required('Обязательно'),
    });

    const ErrorOpen = useCallback(() => {
        setErrorLink(true);
        setTimeout(() => {
            setErrorLink(false);
        }, 2500);
    }, []);

    return (
        <MainContainer className="App">
            <TitlePage>Скачивать файлы стало проще</TitlePage>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur
                onSubmit={(values) => {
                    saveFileApi(values.link, ErrorOpen);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isValid,
                    handleSubmit,
                    dirty,
                }) => {
                    const { link } = values;

                    return (
                        <Form>
                            <Label htmlFor="link">Ссылка на файл:</Label>
                            <CheckContainer>
                                <Input
                                    type={'text'}
                                    name={'link'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={link}
                                />
                                {touched.link && errors.link && (
                                    <Span
                                        className="material-icons"
                                        style={{
                                            fontSize: '30px',
                                            color: 'red',
                                        }}
                                    >
                                        priority_high
                                    </Span>
                                )}
                                {touched.link && !errors.link && (
                                    <Span
                                        className="material-icons"
                                        style={{
                                            fontSize: '30px',
                                            color: 'green',
                                        }}
                                    >
                                        done
                                    </Span>
                                )}
                            </CheckContainer>

                            <ButtonContainer>
                                <Button
                                    disabled={!isValid && !dirty}
                                    type={'button'}
                                    onClick={() => handleSubmit()}
                                >
                                    Скачать
                                </Button>
                            </ButtonContainer>

                            {errorLink && (
                                <ErrorFile>Ошибка загрузки файла</ErrorFile>
                            )}
                        </Form>
                    );
                }}
            </Formik>
        </MainContainer>
    );
}

export default App;

const MainContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(#2f4096, #17002f);
    color: white;
`;

const TitlePage = styled.div`
    font-weight: 600;
    font-size: 25px;
`;

const Form = styled.form`
    width: 50%;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const CheckContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    font-size: 20px;
    margin-bottom: 20px;
`;
const Input = styled.input`
    width: 95%;
    padding: 8px;
    border-radius: 10px;
`;

const Span = styled.span`
    margin-left: 5px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    border: none;
    padding: 20px;
    background: #ffc107;
    border-radius: 11px;
    cursor: pointer;
    font-size: 18px;
    :hover {
        box-shadow: inset 0px -9px 0px rgba(0, 0, 0, 0.18);
    }
`;

const ErrorFile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 20px;
    bottom: 20px;
    background-color: #2f4096;
    border-radius: 20px;
    padding: 25px;
`;
