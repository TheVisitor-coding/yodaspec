import { connect, disconnect } from '@/lib/db'
import Project from '../models/project'
import { Model } from 'mongoose'
import { IProject } from '@/types/interfaces'

const getProjects = async (): Promise<IProject[]> => {
  await connect()
  try {
    const projects = await (Project as Model<IProject>).find().lean().exec()
    return projects
  } catch (error) {
    return []
  } finally {
    await disconnect()
  }
}

const getProjectById = async (projectId: string): Promise<IProject | null> => {
  await connect()
  try {
    const project = await (Project as Model<IProject>).findById(projectId).lean().exec()
    return project
  } catch (error) {
    return null
  } finally {
    await disconnect()
  }
}

export {
  getProjects,
  getProjectById
}
