import './SponsorsEventDetails.scss'
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {SponsorForm} from "./components/sponsor-form/SponsorForm";
import {Icon} from "../../../../components/icon/Icon";
import {text} from "../../../../utils/dictionaryManagement";
import {GlobalApiService, headersApi} from "../../../../services/global-api.service";
import {setSelectedSponsor, setSponsorList} from "../../../../store/data.slice";
import {SponsorModel} from "../../../../models/sponsor.model";
import {setEditSponsorPopup} from "../../../../store/global.slice";
import {FormPopup} from "../../../../components/form-popup/FormPopup";
import {EditSponsorForm} from "./components/edit-sponsor-form/EditSponsorForm";

export const SponsorsEventDetails = () => {
    const dispatch = useAppDispatch();
    const {isEnglish, editSponsorsPopupIsOpen} = useAppSelector(state => state.global);
    const {sponsors} = useAppSelector(state => state.data);

    const H_titles = ["שם החסות", "לינק לחסות", "כתובת הלוגו", "פעולה"];
    const titles = ["Sponsor name", "Sponsor link", "Logo url", "Action"];


    const getTitlesByLanguage = (): string[] => {
        return isEnglish ? titles : H_titles.reverse();
    }
    const editSponsor = (editSponsor: SponsorModel) => {
        dispatch(setSelectedSponsor(editSponsor))
        dispatch(setEditSponsorPopup(true))
    }

    const removeSponsor = (deleteItem: SponsorModel) => {
        fetch(`${GlobalApiService}/api/v1/sponsor/${deleteItem.sponsorId}`,
            {
                method: 'DELETE',
                headers: headersApi
            }
        )
            .then((res) => res.json())
            .catch((err) => {
                console.log(err.message);
            });
        const deleteIndex = sponsors.findIndex((s) => s === deleteItem);
        const newSponsorsList: SponsorModel[] = [...sponsors]
        newSponsorsList.splice(deleteIndex, 1);
        dispatch(setSponsorList(newSponsorsList))
    };


    return <div className={"sponsor-event-details-container"}>
        <SponsorForm/>
        <div className={"add-categories-wrapper"}>
            {sponsors?.length > 0 ?
                <table className={"table-style"}>
                    <thead>
                    <tr className={"first-row row"}>
                        {getTitlesByLanguage().map((title, index) => {
                            return (
                                <th key={index} className={"table-headers"}>
                                    <span
                                        className={`${index === titles.length - 1 ? "last-title" : ""}`}>{title}</span>
                                </th>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {sponsors?.map((sponsor, index) => {
                        return isEnglish ? <tr key={index}>

                                <td>{sponsor.description}</td>
                                <td>{sponsor.link}</td>
                                <td>{sponsor.logoUrl}</td>
                                <td className={"action-category-wrapper"} style={{justifyContent: "end"}}>
                                    <div className={"edit-wrapper"} onClick={() => editSponsor(sponsor)}>
                                        <Icon name={"editIcon"}/>
                                    </div>
                                    <div className={"close_x-wrapper"} onClick={() => removeSponsor(sponsor)}>
                                        <Icon name={"close_x"}/>
                                    </div>
                                </td>
                            </tr> :
                            <tr key={index}>
                                <td className={"action-category-wrapper"}>
                                    <div className={"close_x-wrapper"} onClick={() => removeSponsor(sponsor)}>
                                        <Icon name={"close_x"}/>
                                    </div>
                                    <div className={"edit-wrapper"} onClick={() => editSponsor(sponsor)}>
                                        <Icon name={"editIcon"}/>
                                    </div>
                                </td>
                                <td className={"td-style"}>{sponsor.logoUrl}</td>
                                <td>{sponsor.link}</td>
                                <td style={{display: "flex", justifyContent: "end"}}>{sponsor.description}</td>
                            </tr>

                    })}
                    </tbody>
                </table>
                :
                <div className={"alert-style"}>
                    <span className={"alert-style"}>{text.noExistsCategories}</span>
                </div>}

        </div>

        <FormPopup title={isEnglish ? text.editYourSponsor : text.H_editYourSponsor}
                   formId={"edit-sponsor-form"}
                   show={editSponsorsPopupIsOpen}
                   closeModalFunction={() => dispatch(setEditSponsorPopup(false))}
        >
            <EditSponsorForm/>
        </FormPopup>
    </div>
}