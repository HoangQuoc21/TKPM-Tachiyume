import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const SourceModel = types
    .model("Source")
    .props({
        id: types.maybeNull(types.number),
        baseUrl: types.maybeNull(types.string),
        sourceTitle: types.maybeNull(types.string),
        thumbnail: types.maybeNull(types.string),
        readLanguage: types.maybeNull(types.string),
    })

type SourceType = Instance<typeof SourceModel>

export interface Source extends SourceType {}

type SourceSnapshotType = SnapshotOut<typeof SourceModel>

export interface SourceSnapshot extends SourceSnapshotType {}

export const createSourceDefaultModel = () => types.optional(SourceModel, {})