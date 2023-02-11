import './EditHeatForm.scss'
import {setCreateEventPopup} from "../../../../../store/global.slice";
import {GlobalApiService, headersApi} from "../../../../../services/global-api.service";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import React, {useState} from "react";
import {Checkbox, TextField} from "@mui/material";
import {text} from "../../../../../utils/dictionaryManagement";
export const EditHeatForm=()=>{
    const dispatch = useAppDispatch();
    const {isEnglish} = useAppSelector(state => state.global);
    const {selectedHeat} = useAppSelector(state => state.data);

    const [heatFormInput, setHeatFormInput] = useState<{ [key: string]: number | string | boolean }>(
        {
            MaxAge: selectedHeat?.MaxAge??100,
            MinAge:selectedHeat?.MinAge??0,
            PriceProfile:selectedHeat?.PriceProfile??0,
            Rolls: selectedHeat?.Rolls??0,
            amami: selectedHeat?.amami??0,
            description: selectedHeat?.description??"",
            eventId: selectedHeat?.eventId??0,
            heatId: selectedHeat?.heatId??0,
            mapIframe: selectedHeat?.mapIframe??0,
            mapUrl:selectedHeat?.mapUrl??0,
            prize: selectedHeat?.prize??0,
            routeDescription: selectedHeat?.routeDescription??"",
            showMap: selectedHeat?.showMap??0,
            startHeat: selectedHeat?.startHeat??"00:00:00.00"
        });
    const handleInput = (e: any) => {
        const name = e.target.name;
        const newValue = e.target.value;
        setHeatFormInput({...heatFormInput, [name]: newValue as string | number})
    };

    const submitEditHeat = (e: any) => {
        e.preventDefault()

        console.log("submit heat")
        dispatch(setCreateEventPopup(false))
        fetch(`${GlobalApiService}/api/v1/heat/${heatFormInput.heatId}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    heatFormInput
                }),
                headers: headersApi
            }
        )
            .then((res) => res.json())
            .then((answer) => {
                console.log(answer, "Heat list")
            })
            .catch((err) => {
                console.log(err.message);
            }).then(()=> {
        e.stopPropagation()
        });

    }


    return <div className={"edit-heat-container"}>
        <form id={"edit-heat-form"} className={"formContainer"} onSubmit={submitEditHeat}>
            <TextField
                dir={isEnglish?"ltr":"rtl"}
                label={isEnglish?text.heatName:text.H_heatName}
                id="description"
                name="description"
                type={"text"}
                disabled={true}
                value={heatFormInput.description}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                dir={isEnglish?"ltr":"rtl"}
                label={isEnglish?text.minAge:text.H_minAge}
                id="MinAge"
                name="MinAge"
                type={"number"}
                onChange={handleInput}
                value={heatFormInput.MinAge}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                dir={isEnglish?"ltr":"rtl"}
                label={isEnglish?text.maxAge:text.H_maxAge}
                id="MaxAge"
                name="MaxAge"
                type={"number"}
                onChange={handleInput}
                value={heatFormInput.MaxAge}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                dir={isEnglish?"ltr":"rtl"}
                label={isEnglish?text.heatStartTime:text.H_heatStartTime}
                id="startHeat"
                name="startHeat"
                type={"text"}
                onChange={handleInput}
                value={heatFormInput.startHeat}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                dir={isEnglish?"ltr":"rtl"}
                label={isEnglish?text.price:text.H_price}
                id="PriceProfile"
                name="PriceProfile"
                type={"number"}
                onChange={handleInput}
                value={heatFormInput.PriceProfile}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                dir={isEnglish?"ltr":"rtl"}
                label={isEnglish?text.mapUrl:text.H_mapUrl}
                id="mapUrl"
                name="mapUrl"
                type={"text"}
                onChange={handleInput}
                value={heatFormInput.mapUrl}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                dir={isEnglish?"ltr":"rtl"}
                label={isEnglish?text.routeDescription:text.H_routeDescription}
                id="routeDescription"
                name="routeDescription"
                type={"text"}
                onChange={handleInput}
                value={heatFormInput.routeDescription}
                InputLabelProps={{shrink: true}}
            />
            <div style={{direction:isEnglish?"ltr":"rtl", textAlign:isEnglish?"left":"right"}} className={"check-box-wrapper"}>
                <span>{isEnglish?text.isAmamiHeat:text.H_isAmamiHeat}</span>
                <Checkbox
                    value={heatFormInput.showMaps as boolean}
                    name={"amami"}
                    onChange={(e) => setHeatFormInput({...heatFormInput, "amami": e.target.checked ? 1 : 0})}
                />
            </div>
            <div style={{direction:isEnglish?"ltr":"rtl", textAlign:isEnglish?"left":"right"}} className={"check-box-wrapper"}>
                <span>{isEnglish?text.showMap:text.H_showMap}</span>
                <Checkbox
                    value={heatFormInput.showMaps as boolean}
                    name={"showMap"}
                    onChange={(e) => setHeatFormInput({...heatFormInput, "showMap": e.target.checked ? 1 : 0})}
                />
            </div>




            {/*<Button functionAction={submitEditHeat} type={"submit"} title={isEnglish?text.updateHeatDetails:text.H_updateHeatDetails}/>*/}
        </form>
    </div>
}