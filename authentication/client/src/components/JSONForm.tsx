import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sides from './Layout/Sides';
import Main from './Layout/Main';
import { HiOutlineClock } from "react-icons/hi";

interface PropsType {
    config: any //adding 'any' type as the config structure is a bit lengthy. Type could be defined according to the JSON config strucuter except 'any'
}
interface Layout {
    main: Array<any>,
    side: Array<any>,
    pageTitle: string,
    pageDesc: string
}

const JSONForm: React.FC<PropsType> = ({ config }) => {
    const { main, side, pageTitle, pageDesc }: Layout = config
    return (
        <Container>
            <Row className="align-items-start">
                <Col md={{ span: 5, offset: 2 }}>
                    {
                        main.sort((a: any, b: any) => a.order - b.order).map((section: any, index: any) => (
                            <Main key={section.layoutId} pageTitle={pageTitle} pageDesc={pageDesc} section={section} />
                        ))
                    }
                </Col>
                <Col md={{ span: 3 }}>
                    <div className="d-flex justify-content-end">
                        <HiOutlineClock size={25} className="mb-4" />
                    </div>
                    <Sides side={side} />
                </Col>
            </Row>
        </Container>
    )
}

export default JSONForm