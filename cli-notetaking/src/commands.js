import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {getAll, newNote,findNotes} from '../notes.js'
import {start} from './server.js'

yargs(hideBin(process.argv))
  .command('new <note>','create new note',yargs=>{
    return yargs.positional('note',{
        type:'string',
        description:'The content'
    })
    }
    ,async (argv)=>{
        const tags = argv.tags ? argv.tags.split(','):[]
        const note = await newNote(argv.note,tags);
        console.log('added new!',note)
    })
    .option('tags',{
        alias:'t',
        type:'string',
        description:'tags to add to the note'
    })
    .command('all', 'get all notes', () => {}, async (argv) => {
        console.log(await getAll())
    })
    .command('find <filter>', 'get matching notes', yargs => {
      return yargs.positional('filter', {
        describe: 'The search term to filter notes by, will be applied to note.content',
        type: 'string'
      })
    }, async (argv) => {
       console.log(await findNotes(argv[2]))
    })
    .command('remove <id>', 'remove a note by id', yargs => {
      return yargs.positional('id', {
        type: 'number',
        description: 'The id of the note you want to remove'
      })
    }, async (argv) => {
      
    })
    .command('web [port]', 'launch website to see notes', yargs => {
      return yargs
        .positional('port', {
          describe: 'port to bind on',
          default: 5000,
          type: 'number'
        })
    }, async (argv) => {
      const notes = await getAll();
      start(notes , argv.port) 
    })
    .command('clean', 'remove all notes', () => {}, async (argv) => {
      
    })
    .demandCommand(1)
    .parse() 