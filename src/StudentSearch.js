import React, {useState} from "react"



const StudentSearch = (props) => {
  let {students, letter, setLetter} = props
  let letters = '0abcdefghijklmnopqrstuvwxyz'

  const filterStudents = (ev) => { 
    const button = document.querySelectorAll('#sortButton')
    console.log(button.hasOwnProperty('value'))

    if (button.value === ev.target.value){
      console.log('what the hell')
      button.classList.add('bold')
    }
    let activeLetter = letters.indexOf(ev.target.value)
      if (letters[activeLetter] !== '0'){
        setLetter(letters[activeLetter])
      }
      else {setLetter('0')}
    }     


  return (
    <div id = 'sorting'>
    <button id={'sortButton'} value={'0'} onClick={(ev) => filterStudents(ev)}>All</button>
    <button id={'sortButton'} value={'a'} onClick={(ev) => filterStudents(ev)}>A</button>
    <button id={'sortButton'} value={'b'} onClick={(ev) => filterStudents(ev)}>B</button>
    <button id={'sortButton'} value={'c'} onClick={(ev) => filterStudents(ev)}>C</button>
    <button id={'sortButton'} value={'d'} onClick={(ev) => filterStudents(ev)}>D</button>
    <button id={'sortButton'} value={'e'} onClick={(ev) => filterStudents(ev)}>E</button>
    <button id={'sortButton'} value={'f'} onClick={(ev) => filterStudents(ev)}>F</button>
    <button id={'sortButton'} value={'g'} onClick={(ev) => filterStudents(ev)}>G</button>
    <button id={'sortButton'} value={'h'} onClick={(ev) => filterStudents(ev)}>H</button>
    <button id={'sortButton'} value={'i'} onClick={(ev) => filterStudents(ev)}>I</button>
    <button id={'sortButton'} value={'j'} onClick={(ev) => filterStudents(ev)}>J</button>
    <button id={'sortButton'} value={'k'} onClick={(ev) => filterStudents(ev)}>K</button>
    <button id={'sortButton'} value={'l'} onClick={(ev) => filterStudents(ev)}>L</button>
    <button id={'sortButton'} value={'m'} onClick={(ev) => filterStudents(ev)}>M</button>
    <button id={'sortButton'} value={'n'} onClick={(ev) => filterStudents(ev)}>N</button>
    <button id={'sortButton'} value={'o'} onClick={(ev) => filterStudents(ev)}>O</button>
    <button id={'sortButton'} value={'p'} onClick={(ev) => filterStudents(ev)}>P</button>
    <button id={'sortButton'} value={'q'} onClick={(ev) => filterStudents(ev)}>Q</button>
    <button id={'sortButton'} value={'r'} onClick={(ev) => filterStudents(ev)}>R</button>
    <button id={'sortButton'} value={'s'} onClick={(ev) => filterStudents(ev)}>S</button>
    <button id={'sortButton'} value={'t'} onClick={(ev) => filterStudents(ev)}>T</button>
    <button id={'sortButton'} value={'u'} onClick={(ev) => filterStudents(ev)}>U</button>
    <button id={'sortButton'} value={'v'} onClick={(ev) => filterStudents(ev)}>V</button>
    <button id={'sortButton'} value={'w'} onClick={(ev) => filterStudents(ev)}>W</button>
    <button id={'sortButton'} value={'x'} onClick={(ev) => filterStudents(ev)}>X</button>
    <button id={'sortButton'} value={'y'} onClick={(ev) => filterStudents(ev)}>Y</button>
    <button id={'sortButton'} value={'z'} onClick={(ev) => filterStudents(ev)}>Z</button>
    </div>  
)

}
export default StudentSearch
