import React from 'react'

import { Card, CardBody, CardFooter } from 'reactstrap'

const PledgeCard = ({thumbnail, goal, total, count, codetotal}) => {
    return (
        <Card>
            <CardBody className="d-flex">
                <div>
                    <img src={thumbnail} alt="thumbnail" />
                </div>
                <div className="ml-4">
                    <h6 className="text-info font-weight-bold">${total}</h6>
                    <h6 className="text-muted font-size-14 mt-1">pledged of ${goal} goal</h6>
                    <h6 className="text-muted font-size-16 mt-2 font-weight-bold">{count}</h6>
                    <h6 className="text-muted font-size-14 mt-1">pledgers</h6>
                </div>
            </CardBody>
            <CardFooter>
                <h6 className="text-muted font-size-14 mt-1">code Submissions ({codetotal})</h6>
            </CardFooter>
        </Card>
    )
}

export default PledgeCard