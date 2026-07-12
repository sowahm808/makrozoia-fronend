import { Injectable, inject } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { Observable, map } from "rxjs";
import {
  CompanyProfile,
  CompanyProfileFormValue,
  PocStatus,
} from "../models/company-profile.model";

@Injectable({ providedIn: "root" })
export class CompanyProfileService {
  private readonly firestore = inject(Firestore);
  private readonly collectionRef = collection(this.firestore, "companyProfiles");

  getAllProfiles(): Observable<CompanyProfile[]> {
    const q = query(this.collectionRef, orderBy("updatedAt", "desc"));

    return collectionData(q, { idField: "id" }) as Observable<CompanyProfile[]>;
  }

  getProfileByUid(uid: string): Observable<CompanyProfile | null> {
    const q = query(this.collectionRef, where("createdByUid", "==", uid));

    return (collectionData(q, { idField: "id" }) as Observable<
      CompanyProfile[]
    >).pipe(map((profiles) => profiles[0] ?? null));
  }

  getProfile(id: string): Observable<CompanyProfile> {
    return docData(doc(this.firestore, `companyProfiles/${id}`), {
      idField: "id",
    }) as Observable<CompanyProfile>;
  }

  async createProfile(
    uid: string,
    value: CompanyProfileFormValue,
  ): Promise<void> {
    const ref = doc(this.collectionRef);

    await setDoc(ref, {
      ...value,
      pocStatus: "Accepted",
      createdByUid: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  async updateProfile(
    id: string,
    value: CompanyProfileFormValue,
  ): Promise<void> {
    await updateDoc(doc(this.firestore, `companyProfiles/${id}`), {
      ...value,
      updatedAt: serverTimestamp(),
    });
  }

  async updatePocStatus(id: string, pocStatus: PocStatus): Promise<void> {
    await updateDoc(doc(this.firestore, `companyProfiles/${id}`), {
      pocStatus,
      updatedAt: serverTimestamp(),
    });
  }
}
