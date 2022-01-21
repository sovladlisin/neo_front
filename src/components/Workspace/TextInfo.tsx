import * as React from 'react';
import { TClass, TObjectExtended, TRelation } from '../../actions/ontology/classes/types';
import { getName, NOTE_URI, ORIGINAL_TITLE_URI, TEXT_ARCHIVED_URI, TEXT_COLLECTED_URI, TEXT_DECRYPTED_URI, TEXT_DIALECT_URI, TEXT_LANGUAGE_URI, TEXT_TRANSATED_URI, TEXT_TYPE, TEXT_TYPE_URI, TEXT_UMPRINT_URI, TITLE_URI } from '../../utils';
import ObjectInfo from '../Ontology/ObjectInfo';

interface ITextInfoProps {
    node_info: { node: TClass, relations: TRelation[] }
}

const TextInfo: React.FunctionComponent<ITextInfoProps> = (props) => {

    type TTextInfoSubType = {
        id: number,
        uri: string,
        name: string
    }

    type TTextInfoType = {
        title: string,
        title_original: string,
        genre: TTextInfoSubType,
        lang: TTextInfoSubType,
        dialect: TTextInfoSubType,
        place: TTextInfoSubType,
        time: string,
        collector: TTextInfoSubType,
        decryptor: TTextInfoSubType,
        translator: TTextInfoSubType,
        published: string,
        variants: string,
        areal: string,
        note: string,
        archived_in: string

    }

    const [data, setData] = React.useState<TTextInfoType>(null)

    React.useEffect(() => { collect() }, [])
    const collect = () => {
        const node = props.node_info.node

        const rel_nodes: { name: string, id: number, uri: string }[] = props.node_info.relations.map(r => {
            const item: TClass = r.end_node.id === props.node_info.node.id ? r.start_node : r.end_node
            return {
                name: getName(item),
                id: item.id,
                uri: r.labels[0]
            }

        })

        const g: TTextInfoType = {
            // название
            title: node[TITLE_URI],
            // название на нац. языке
            title_original: node[ORIGINAL_TITLE_URI],
            // жанр
            genre: rel_nodes.find(r => r.uri === TEXT_TYPE_URI),

            // язык
            lang: rel_nodes.find(r => r.uri === TEXT_LANGUAGE_URI),

            // диалект
            dialect: rel_nodes.find(r => r.uri === TEXT_DIALECT_URI),

            // место записи
            place: null,
            // время записи
            time: '-',

            // собиратель
            collector: rel_nodes.find(r => r.uri === TEXT_COLLECTED_URI),

            // расшифрофка
            decryptor: rel_nodes.find(r => r.uri === TEXT_DECRYPTED_URI),

            // перевод на русский
            translator: rel_nodes.find(r => r.uri === TEXT_TRANSATED_URI),

            // опубликовано
            published: node[TEXT_UMPRINT_URI],

            // место хранения
            archived_in: node[TEXT_ARCHIVED_URI],


            // варианты
            variants: '-',
            // ареал
            areal: '-',

            // дополнительно
            note: node[NOTE_URI] ? node[NOTE_URI] : 'Описание отсутсвует...',


        }

        setData(g)

    }

    const [selectedEvent, setSelectedEvent] = React.useState(-1)

    return <>
        <div className='text-info-container'>
            {data && <>
                <div>
                    <label>Название</label>
                    <p>{data.title}</p>
                    <label>Название на национальном языке</label>
                    <p>{data.title}</p>
                    <label>Жанр</label>
                    <p className='text-info-container-event-item' onClick={_ => data.genre && setSelectedEvent(data.genre.id)}>{data.genre ? data.genre.name : '-'}</p>
                    <label>Язык</label>
                    <p className='text-info-container-event-item' onClick={_ => data.lang && setSelectedEvent(data.lang.id)}>{data.lang ? data.lang.name : '-'}</p>
                    <label>Диалект</label>
                    <p className='text-info-container-event-item' onClick={_ => data.dialect && setSelectedEvent(data.dialect.id)}>{data.dialect ? data.dialect.name : '-'}</p>
                    <label>Место записи</label>
                    <p className='text-info-container-event-item' onClick={_ => data.place && setSelectedEvent(data.place.id)}>{data.place ? data.place.name : '-'}</p>
                    <label>Время записи</label>
                    <p>{data.time}</p>
                    <label>Место хранения</label>
                    <p>{data.archived_in}</p>
                </div>
                <div>
                    <label>Собиратель</label>
                    <p className='text-info-container-event-item' onClick={_ => data.collector && setSelectedEvent(data.collector.id)}>{data.collector ? data.collector.name : '-'}</p>
                    <label>Расшифровка аудиозаписи</label>
                    <p className='text-info-container-event-item' onClick={_ => data.decryptor && setSelectedEvent(data.decryptor.id)}>{data.decryptor ? data.decryptor.name : '-'}</p>
                    <label>Перевод на русский язык</label>
                    <p className='text-info-container-event-item' onClick={_ => data.translator && setSelectedEvent(data.translator.id)}>{data.translator ? data.translator.name : '-'}</p>
                    <label>Опубликовано (Выходные данные)</label>
                    <p>{data.published}</p>
                    <label>Варианты	</label>
                    <p>{data.variants}</p>
                    <label>Ареал распространения</label>
                    <p>{data.areal}</p>
                </div>
            </>}
        </div>
        <div className='text-info-description'>
            {data ? data.note : ''}
        </div>

        {selectedEvent != -1 && <ObjectInfo onSelect={(id) => setSelectedEvent(id)} onClose={() => setSelectedEvent(-1)} object_id={selectedEvent} />}
    </>;
};

export default TextInfo;
