import fontawesome from '@fortawesome/fontawesome'


fontawesome.config.autoReplaceSvg = false
fontawesome.config.measurePerformance = true
fontawesome.config.observeMutations = false


// Add used icons here:
import { faPlay, faPause, faBars } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faPlay)
fontawesome.library.add(faPause)
fontawesome.library.add(faBars)
