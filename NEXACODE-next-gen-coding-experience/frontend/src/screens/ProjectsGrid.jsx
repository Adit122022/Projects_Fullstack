import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user.context'
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiUsers, FiStar, FiCode, FiLayers } from 'react-icons/fi'
import NexaCodeLogo from '../assets/nexa-code-logo.svg' // Replace with your actual logo import

const ProjectGrid = () => {
    const { user } = useContext(UserContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [projects, setProjects] = useState([])
    const [hoveredCard, setHoveredCard] = useState(null)

    const navigate = useNavigate()

    function createProject(e) {
        e.preventDefault()
        axios.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                setIsModalOpen(false)
                setProjectName('')
                fetchProjects()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchProjects = () => {
        axios.get('/projects/all').then((res) => {
            setProjects(res.data.projects)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    const cardHover = {
        scale: 1.03,
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
            {/* Decorative floating elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg rotate-45 filter blur-xl"></div>
            </div>

            <div className="relative z-10 p-6 pt-20 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <img src={NexaCodeLogo} alt="Nexa Code" className="h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                Your Projects
                            </h1>
                        </div>
                        <p className="text-gray-400 mt-1">Select a project or create a new one</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white shadow-lg"
                    >
                        <FiPlus className="text-lg" />
                        New Project
                    </motion.button>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="relative mb-8">
                                <img src={NexaCodeLogo} alt="Nexa Code" className="h-20 mx-auto opacity-70" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FiCode className="text-4xl text-blue-400/30" />
                                </div>
                            </div>
                            <h3 className="text-xl font-medium text-gray-300 mb-3">Welcome to Nexa Code</h3>
                            <p className="text-gray-500 mb-6">Get started by creating your first project</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsModalOpen(true)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white shadow-lg"
                            >
                                Create First Project
                            </motion.button>
                            
                            <div className="mt-12 grid grid-cols-3 gap-4 text-gray-600">
                                <div className="flex flex-col items-center">
                                    <FiLayers className="text-2xl mb-2" />
                                    <span className="text-xs">Projects</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FiUsers className="text-2xl mb-2" />
                                    <span className="text-xs">Collaborate</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FiStar className="text-2xl mb-2" />
                                    <span className="text-xs">Premium</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {projects.map((project) => (
                            <motion.div
                                key={project._id}
                                variants={item}
                                whileHover={cardHover}
                                onHoverStart={() => setHoveredCard(project._id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                onClick={() => {
                                    navigate(`/project`, {
                                        state: { project }
                                    })
                                }}
                                className={`relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300 ${hoveredCard === project._id ? 'bg-gray-800' : 'bg-gray-800/50'}`}
                                style={{
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-xl font-semibold text-white mb-3 uppercase">{project.name}</h2>
                                        <div className="bg-blue-500/20 rounded-full p-1">
                                            <img src={NexaCodeLogo} alt="Nexa Code" className="h-4 opacity-80" />
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-400">
                                        <FiUsers className="mr-2" />
                                        <span>{project.users.length} Collaborator{project.users.length !== 1 ? 's' : ''}</span>
                                    </div>
                                </div>
                                {hoveredCard === project._id && (
                                    <motion.div 
                                        className="absolute inset-0 pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                        
                        {/* Add Project Card (always visible) */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setIsModalOpen(true)}
                            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 transition-all cursor-pointer p-6 bg-gray-800/20"
                        >
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mb-4">
                                <FiPlus className="text-white text-xl" />
                            </div>
                            <h3 className="text-lg font-medium text-center">Add New Project</h3>
                            <p className="text-sm text-gray-500 text-center mt-1">Click to create</p>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-gray-800/90 backdrop-blur-md p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-700"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <img src={NexaCodeLogo} alt="Nexa Code" className="h-6" />
                                    <h2 className="text-xl font-bold text-white">Create New Project</h2>
                                </div>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>
                            <form onSubmit={createProject}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                                    <input
                                        onChange={(e) => setProjectName(e.target.value)}
                                        value={projectName}
                                        type="text" 
                                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        placeholder="Enter project name"
                                        required 
                                        autoFocus
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <motion.button 
                                        type="button" 
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button 
                                        type="submit" 
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white"
                                    >
                                        Create Project
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ProjectGrid