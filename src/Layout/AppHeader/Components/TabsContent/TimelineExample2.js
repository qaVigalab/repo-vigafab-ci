import React, {Component, Fragment, useState, useEffect} from 'react';

import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';

import PerfectScrollbar from 'react-perfect-scrollbar';


const ChatExample =()=> {
    const [alertas, setAlertas] = useState([])
    const cargarNuevasAlertas =()=>{
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", `${process.env.REACT_APP_DASHBOARD_API_KEY}`);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "pt":localStorage.getItem("token"),
            "pi":localStorage.getItem("id_user"),
            "division":localStorage.getItem("division"),
            "id": localStorage.getItem("id_user")
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
             fetch(global.api.dashboard.getAlertUser, requestOptions)
             .then(res => res.json())
             .then((data) => {
                 setAlertas(data)
             })
            .catch(console.log)
    }
    
      useEffect(() => {
        
        cargarNuevasAlertas();
        
       
      }, []);
        return (
            <Fragment>
                <div className="scroll-area-sm">
                    <PerfectScrollbar>
                        <div className="p-3">
                            {
                            alertas.map(x=>(
                            <VerticalTimeline layout="1-column" className="vertical-without-time">
                               
                                <VerticalTimelineElement
                                    className="vertical-timeline-item"
                                    icon={<i className="badge badge-dot badge-dot-xl badge-danger"> </i>}
                                >
                                    <h4 className="timeline-title">{x.nombre}</h4>
                                    <p>
                                        {x.fecha}
                                    </p>
                                </VerticalTimelineElement>
                               
                            </VerticalTimeline>
                            ))
                            
                            
                            }
                            

                        </div>
                    </PerfectScrollbar>
                </div>
            </Fragment>
        )
    
}

export default ChatExample;