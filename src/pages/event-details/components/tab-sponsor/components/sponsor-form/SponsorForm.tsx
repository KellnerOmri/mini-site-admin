import './SponsorForm.scss'
import {TextField} from "@mui/material";
import {text} from "../../../../../../utils/dictionaryManagement";
import {Button} from "../../../../../../components/button/Button";
import React, {useState} from "react";
import {SponsorModel} from "../../../../../../models/sponsor.model";
import {useAppDispatch, useAppSelector} from "../../../../../../app/hooks";
import {setSponsorList} from "../../../../../../store/data.slice";
import {GlobalApiService, headersApi} from "../../../../../../services/global-api.service";
export const SponsorForm=()=>{
    const {isEnglish} = useAppSelector(state => state.global);
    const {sponsors,selectedEvent} = useAppSelector(state => state.data);
    const dispatch = useAppDispatch();
    const [sponsorEventFormInput, setSponsorEventFormInput] = useState<SponsorModel|undefined>()


    const submitSponsorDetails = (e: any) => {
        e.preventDefault()
        setSponsorEventFormInput(undefined)
        console.log(sponsors,"sponsors")
        fetch(`${GlobalApiService}/api/v1/sponsor/${selectedEvent?.eventId}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    sponsorEventFormInput
                }),
                headers: headersApi
            }
        )
            .then((res) => res.json())
            .catch((err) => {
                console.log(err.message);
            });
        dispatch(setSponsorList([...sponsors,sponsorEventFormInput as SponsorModel]))
    }
    const handleInput = (e: any) => {
        const name = e.target.name;
        const newValue = e.target.value;
        setSponsorEventFormInput({...sponsorEventFormInput as SponsorModel, [name]: newValue})
    };

    return   <form id={"sponsor-event-form"} className={"sponsor-form-wrapper"} onSubmit={submitSponsorDetails}>
        <TextField
            fullWidth={true}
            label={isEnglish?text.sponsorDescription:text.H_sponsorDescription}
            id="description"
            name="description"
            type={"text"}
            onChange={handleInput}
            value={sponsorEventFormInput?sponsorEventFormInput.description:""}
            InputLabelProps={{shrink: true}}
            required={true}
        />
        <TextField
            fullWidth={true}
            label={isEnglish?text.logoUrl:text.H_logoUrl}
            id="logoUrl"
            name="logoUrl"
            type={"text"}
            onChange={handleInput}
            value={sponsorEventFormInput?sponsorEventFormInput.logoUrl:""}
            InputLabelProps={{shrink: true}}
            required={true}

        />
        <TextField
            fullWidth={true}
            label={isEnglish?text.sponsorLink:text.H_sponsorLink}
            id="link"
            name="link"
            type={"text"}
            onChange={handleInput}
            value={sponsorEventFormInput?sponsorEventFormInput.link:""}
            InputLabelProps={{shrink: true}}
            required={true}

        />
        <Button form={"sponsor-event-form"} size={"none"} functionAction={()=>{}} type={"submit"} iconKey={"plus"}/>
    </form>
}