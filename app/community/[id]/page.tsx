import { GroupPage } from '../../_components/Platform';
import { groups } from '../../_components/mockData';
export function generateStaticParams(){return groups.map(group=>({id:group.id}))}
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <GroupPage id={id}/>}
