import './EditSponsorForm.scss'
import {TextField} from "@mui/material";
import {text} from "../../../../../../utils/dictionaryManagement";
import React, {useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../app/hooks";
import {GlobalApiService, headersApi} from "../../../../../../services/global-api.service";
import {setSponsorList} from "../../../../../../store/data.slice";
import {SponsorModel} from "../../../../../../models/sponsor.model";

export const EditSponsorForm = () => {
    const dispatch = useAppDispatch();
    const {isEnglish} = useAppSelector(state => state.global);
    const {selectedSponsor, sponsors} = useAppSelector(state => state.data);
    const [newDescription, setNewDescription] = useState<string>(selectedSponsor!.description as string);
    const [newLogoUrl, setNewLogoUrl] = useState<string>(selectedSponsor!.logoUrl as string);
    const [newLink, setNewLink] = useState<string>(selectedSponsor!.link as string);

    const updateSponsor: SponsorModel = useMemo(() => {
        return {
            sponsorId: selectedSponsor?.sponsorId as number,
            description: newDescription,
            link: newLink,
            logoUrl: newLogoUrl
        }
    }, [newDescription, newLogoUrl, newLink])


    const submitEditSponsorDetails = (e: any) => {
        const newSponsorList = [...sponsors]
        fetch(`${GlobalApiService}/api/v1/sponsor`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    updateSponsor
                }),
                headers: headersApi
            }
        )
            .then((res) => res.json())
            .catch((err) => {
                console.log(err.message);
            });
        const updateSponsorIndex = sponsors.findIndex((s) => s.sponsorId === selectedSponsor?.sponsorId);
        newSponsorList[updateSponsorIndex] = updateSponsor;
        dispatch(setSponsorList(newSponsorList))
        e.preventDefault()
    }


    return <div>
        <form id={"edit-sponsor-form"} className={"edit-sponsor-form-wrapper"} onSubmit={submitEditSponsorDetails}>
            <TextField
                fullWidth={true}
                label={isEnglish ? text.sponsorDescription : text.H_sponsorDescription}
                id="description"
                name="description"
                type={"text"}
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                InputLabelProps={{shrink: true}}
                required={true}
            />
            <TextField
                fullWidth={true}
                label={isEnglish ? text.logoUrl : text.H_logoUrl}
                id="logoUrl"
                name="logoUrl"
                type={"text"}
                onChange={(e) => setNewLogoUrl(e.target.value)}
                value={newLogoUrl}
                InputLabelProps={{shrink: true}}
                required={true}

            />
            <TextField
                fullWidth={true}
                label={isEnglish ? text.sponsorLink : text.H_sponsorLink}
                id="link"
                name="link"
                type={"text"}
                onChange={(e) => setNewLink(e.target.value)}
                value={newLink}
                InputLabelProps={{shrink: true}}
                required={true}
            />
        </form>
    </div>
}